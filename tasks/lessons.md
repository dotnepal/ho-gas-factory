# Lessons Learned

## L-001: vite-plugin-ssg scanner requires `ssgOptions` to close with `};`

**Pattern:** Every page that exports `ssgOptions` MUST end the object literal with `};` (semicolon on its own line). The scanner uses the regex:
```
/export\s+const\s+ssgOptions\s*(?::\s*\w+)?\s*=\s*\{([\s\S]*?)\n\};/
```
If the closing is just `}` (no semicolon), the page is silently skipped: `[SSG] Skipping <file>.tsx (no ssgOptions export)`.

**Symptom:** Build succeeds and the page JS is bundled, but the static HTML is NOT prerendered and `index.html` remains as a bare SPA shell.

**Fix:** Always close ssgOptions with `};` not `}`:
```ts
export const ssgOptions: SsgOptions = {
  slug: 'index',
  ...
  context: async (children) => { ... },
};  // ← semicolon required
```

**Discovered during:** F-003 when HomePage.tsx grew complex enough that the missing `;` became visible.
