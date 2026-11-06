import { readFile, writeFile } from 'node:fs/promises';
import type { Plugin, ViteDevServer } from 'vite';
import { parseFrontmatter } from './src/lib/frontmatter';
import { toSlug } from './src/lib/slug';

/**
 * Local visual Journal Studio API (active only during `npm run dev`).
 * Never bundled into production `dist/`.
 */
export function localJournalStudioPlugin(): Plugin {
  return {
    name: 'local-journal-studio',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/__journal_api', async (req, res, next) => {
        const fs = await import('node:fs/promises');
        const path = await import('node:path');
        const journalDir = path.resolve(process.cwd(), 'src/content/journal');
        const publicJournalDir = path.resolve(process.cwd(), 'public/journal');

        const sendJson = (status: number, payload: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
        };

        const readBody = (): Promise<string> =>
          new Promise((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => {
              data += chunk;
            });
            req.on('end', () => resolve(data));
            req.on('error', reject);
          });

        try {
          await fs.mkdir(journalDir, { recursive: true });
          await fs.mkdir(publicJournalDir, { recursive: true });

          if (req.method === 'GET' && req.url === '/posts') {
            const entries = await fs.readdir(journalDir);
            const mdFiles = entries.filter((f) => f.endsWith('.md'));
            const posts = await Promise.all(
              mdFiles.map(async (filename) => {
                const raw = await readFile(path.join(journalDir, filename), 'utf8');
                const { data, body } = parseFrontmatter(raw);
                return {
                  filename,
                  title: data.title ?? '',
                  subtitle: data.subtitle ?? '',
                  date: data.date ?? new Date().toISOString().slice(0, 10),
                  slug: data.slug || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/i, ''),
                  image: data.image ?? '',
                  imageAlt: data.imagealt ?? '',
                  draft: data.draft === 'true' || data.published === 'false',
                  content: body,
                };
              }),
            );
            posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return sendJson(200, { posts });
          }

          if (req.method === 'POST' && req.url === '/save') {
            const payload = JSON.parse(await readBody()) as {
              originalFilename?: string;
              title: string;
              subtitle?: string;
              date: string;
              slug?: string;
              image?: string;
              imageAlt?: string;
              draft?: boolean;
              content: string;
            };

            const title = (payload.title ?? '').trim();
            const date = (payload.date ?? '').trim() || new Date().toISOString().slice(0, 10);
            if (!title) return sendJson(400, { error: 'Title is required.' });

            const slug = toSlug(payload.slug?.trim() || title);
            if (!slug) return sendJson(400, { error: 'Could not derive a valid URL slug.' });

            const filename = `${date}-${slug}.md`;
            const targetPath = path.join(journalDir, filename);

            const esc = (val: string) => `"${(val ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
            const fileContent = [
              '---',
              `title: ${esc(title)}`,
              `subtitle: ${esc(payload.subtitle?.trim() ?? '')}`,
              `date: ${date}`,
              `slug: ${slug}`,
              `image: ${esc(payload.image?.trim() ?? '')}`,
              `imageAlt: ${esc(payload.imageAlt?.trim() ?? '')}`,
              `draft: ${payload.draft ? 'true' : 'false'}`,
              '---',
              '',
              (payload.content ?? '').trim(),
              '',
            ].join('\n');

            if (
              payload.originalFilename &&
              payload.originalFilename !== filename &&
              payload.originalFilename.endsWith('.md')
            ) {
              const oldPath = path.join(journalDir, path.basename(payload.originalFilename));
              await fs.unlink(oldPath).catch(() => {});
            }

            await writeFile(targetPath, fileContent, 'utf8');
            return sendJson(200, { ok: true, filename, slug });
          }

          if (req.method === 'POST' && req.url === '/delete') {
            const { filename } = JSON.parse(await readBody()) as { filename?: string };
            if (!filename || !filename.endsWith('.md')) {
              return sendJson(400, { error: 'Invalid filename.' });
            }
            const targetPath = path.join(journalDir, path.basename(filename));
            await fs.unlink(targetPath);
            return sendJson(200, { ok: true });
          }

          if (req.method === 'POST' && req.url === '/upload-image') {
            const { filename, base64 } = JSON.parse(await readBody()) as {
              filename: string;
              base64: string;
            };
            const ext = path.extname(filename).toLowerCase() || '.jpg';
            const base = toSlug(path.basename(filename, ext)) || 'cover';
            const safeName = `${Date.now()}-${base}${ext}`;
            const matches = base64.match(/^data:[^;]+;base64,(.+)$/);
            const buffer = Buffer.from(matches ? matches[1] : base64, 'base64');
            await writeFile(path.join(publicJournalDir, safeName), buffer);
            return sendJson(200, { ok: true, url: `/journal/${safeName}` });
          }

          next();
        } catch (err) {
          sendJson(500, { error: err instanceof Error ? err.message : 'Server error' });
        }
      });
    },
  };
}
