/**
 * Markdown negotiation helpers — clean machine-readable markdown generation.
 *
 * Shared by the `.md.ts` static endpoints (AI Readiness — markdown variants).
 * Every value is sourced from the data layer by the calling endpoint; these
 * helpers only format and escape — they never invent data.
 */

/** JSON string is a valid YAML scalar — sidesteps quote/colon/newline injection. */
export function yamlScalar(value: unknown): string {
  return JSON.stringify(value);
}

/** Sanitize a single markdown table cell (pipe + newline). */
export function cell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

/** YAML frontmatter block from a field map (skips null/undefined values). */
export function frontmatter(fields: Record<string, unknown>): string {
  const lines: string[] = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    lines.push(`${key}: ${yamlScalar(value)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

/** Markdown table from a header row and data rows. */
export function mdTable(headers: string[], rows: unknown[][]): string {
  return [
    `| ${headers.map((h) => cell(h)).join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.map((c) => cell(c)).join(' | ')} |`),
  ].join('\n');
}

/** Bullet list from a string array. */
export function mdList(items: string[]): string {
  return items.map((i) => `- ${cell(i)}`).join('\n');
}

/** Deterministic URL slug from an arbitrary label. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Wrap markdown body as a text/markdown Response. */
export function mdResponse(md: string): Response {
  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
