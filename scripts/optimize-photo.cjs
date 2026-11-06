/**
 * Generates the three responsive WebP files used by the photo gallery and the
 * Chapter 5 research renders.
 *
 * Usage:
 *   node scripts/optimize-photo.cjs "C:\path\to\photo.jpg" photo-slug
 *   node scripts/optimize-photo.cjs "C:\path\to\render.png" proposed-masterplan research/figures 84
 *
 * Arguments:
 *   input   source image
 *   slug    filename stem for the generated files
 *   outDir  folder inside public/ (default: photography/gallery)
 *   quality WebP quality 1–100 (default: 82)
 *
 * It writes <outDir>/<slug>-640.webp, -1024.webp and -1536.webp, then prints
 * the entry to paste into src/data/photography.ts or src/data/thesisFigures.ts.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const [input, slug, outSubdir = 'photography/gallery', qualityArg] = process.argv.slice(2);

if (!input || !slug) {
  console.error(
    'Usage: node scripts/optimize-photo.cjs <input-image> <slug> [outDir] [quality]'
  );
  process.exit(1);
}

const quality = Number(qualityArg) || 82;
const outDir = path.resolve(__dirname, '..', 'public', ...outSubdir.split('/'));
fs.mkdirSync(outDir, { recursive: true });

const widths = [640, 1024, 1536];

(async () => {
  const meta = await sharp(input).metadata();
  const made = [];

  for (const width of widths) {
    const target = Math.min(width, meta.width);
    const dest = path.join(outDir, `${slug}-${target}.webp`);
    const info = await sharp(input)
      .rotate()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(dest);
    made.push(`${target}w (${Math.round(info.size / 1024)} KB)`);
  }

  console.log(`Wrote ${made.join(', ')}`);
  console.log(`\nAdd this to the data file for /${outSubdir}:`);
  console.log(`  {
    id: '${slug}',
    title: '',
    alt: '',
    caption: '',
    image: '/${outSubdir}/${slug}',
    width: ${meta.width},
    height: ${meta.height},
  },`);
})();
