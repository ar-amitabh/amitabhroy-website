export interface FrontmatterResult {
  data: Record<string, string>;
  body: string;
}

/**
 * Parses the small YAML subset used by journal posts: `key: value` pairs
 * between two `---` fences. Quoted values are unquoted; everything else is
 * kept as a string so callers decide how to interpret it.
 */
export function parseFrontmatter(source: string): FrontmatterResult {
  const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');

  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized.trim() };
  }

  const end = normalized.indexOf('\n---', 4);
  if (end === -1) {
    return { data: {}, body: normalized.trim() };
  }

  const header = normalized.slice(4, end);
  const body = normalized.slice(end + 4).replace(/^\n/, '');
  const data: Record<string, string> = {};

  for (const rawLine of header.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separator = line.indexOf(':');
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim().toLowerCase();
    let value = line.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body };
}
