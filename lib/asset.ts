/**
 * Prefix a root-absolute public asset path with the deploy base path.
 *
 * GitHub Pages serves this site from a repo subpath (e.g. /jazxii-portfolio), so
 * hardcoded `<img src="/media/...">` strings 404 there: Next.js only auto-prefixes
 * `basePath` onto framework assets (`_next`), `next/image`, and `<Link>` — never
 * onto arbitrary URL strings. Wrap any such path in `asset()` so it resolves both
 * locally (no base path) and on Pages.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by CI for the static-export build and is empty for
 * local dev — see next.config.ts.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
