# amygottung.com

Static portfolio site for Amy Gottung. **Astro 4** (no framework integrations, no SSR),
deployed on **Vercel** from the GitHub repo. Content is edited through **Kaki CMS**, a
custom CMS, and lives in this repo as Markdown + YAML.

## Stack

| Concern | Choice |
|---|---|
| Site generator | Astro 4, static output, `trailingSlash: 'always'` |
| Styling | SCSS (`src/styles/`), Bulma 0.9.4 vendored |
| Hosting | Vercel, auto-deploy on push to `main` (`vercel.json` pins `npm ci`) |
| CMS | Kaki CMS (external app; commits to this repo via the GitHub API) |
| Client-side JS | Plain scripts in `public/assets/js/` — masonry/isotope grid, showdown, lazysizes |

```bash
npm run dev      # astro dev
npm run build    # astro build → dist/
npm run preview  # serve dist/
```

## Kaki CMS

Kaki CMS is a **separate self-hosted Next.js app** (source: `~/code/kaki-cms`) that serves
as the editing UI for many client repos at once. It is **not** Decap/Netlify CMS, and this
site is **not** on Netlify — an earlier incarnation of this project used Decap CMS backed by
GitLab, and that setup is fully removed.

How it works:

- Editors log in at the Kaki URL (not at amygottung.com). There is **no `/admin` route on
  this site** — do not add one.
- Kaki reads **`cms.config.json` at the repo root** at runtime to build the editing UI.
  Changing that file changes the CMS immediately; no redeploy of Kaki is needed.
- Saving a document commits straight to `main` via the GitHub API, which triggers a Vercel
  rebuild. That's why the log is full of `Update src/content/works/*.md via CMS` and
  `chore: update collection order` commits.
- Auth/tenancy for Kaki live in Supabase; content lives only here in git.

### `cms.config.json` shape

- `collections` — folder-backed content. Only `works` (`src/content/works`), flagged
  `orderable` and `publishable`.
- `singletons` — fixed files: `src/content/pages/index.md`, `src/content/pages/clients.md`.
- `data_files` — the YAML/JSON in `_data/`.
- `assets_path` — `public/assets/uploads` (where CMS image uploads land).

### Two Kaki behaviours worth knowing

**Slugs are frozen at creation.** Kaki derives the filename from the title *only* when the
document is new (`toSlug(title)`, de-duplicated with a `-2` suffix); subsequent saves reuse
the existing `filePath`. Renaming a work in the CMS does **not** rename the file, so a
title and its URL can drift apart indefinitely. `src/content/works/airsa-services-for-newcomer-artists.md`
is a live example: it holds a "Mini-docs" entry because an old AIRSA entry was overwritten
in place. Fixing a wrong slug means renaming the file in git and updating `_order.json`.

**Ordering and publishing are separate.** `orderable` writes
`src/content/works/_order.json` — a plain array of slugs that drives display order.
`publishable` toggles a `published` boolean in frontmatter. A work can be in `_order.json`
and still be hidden.

## Content model

```
src/content/works/*.md    # work items (Astro content collection `works`)
src/content/works/_order.json   # ordered slug array, written by Kaki
src/content/pages/*.md    # index.md, clients.md (collection `pages`)
_data/site_config.yml     # title, short bio, email, category list
_data/navigation.yml      # nav items + visibility flags
_data/about.yml           # about page boxes (markdown, rendered server-side via marked)
_data/tags.json           # tag vocabulary offered by the CMS
public/assets/uploads/    # CMS-uploaded images, served at original size
```

Schemas are in `src/content/config.ts`. `src/data/index.ts` loads the `_data/` files and
`_order.json` at build time.

Two details that trip people up:

- **`published` defaults to `true`.** The schema is `z.boolean().optional().default(true)`,
  and every page filters with `data.published !== false`. A work with no `published` key is
  live. Older files predating the flag are therefore all visible.
- **`layout:` in frontmatter is a Jekyll leftover.** It's accepted as optional in the schema
  and ignored at render time. Kaki doesn't write it. Harmless; don't rely on it.

## Routing

- `src/pages/[slug].astro` — one page per published work, plus related-works by shared tag
  (restricted to slugs present in `_order.json`).
- `work.astro` — all published works; `creative` / `consulting` / `speaking` / `writing` —
  filtered by the `categories` field. Nav visibility for these is in `_data/navigation.yml`.
- `about.astro`, `clients.astro`, `index.astro`, `404.astro`.

`WorkList.astro` renders the grid, ordering by `_order.json` position.

## Markdown rendering

Two paths, and they behave differently:

- **Build time** — Astro's markdown pipeline, with `rehype-external-links` adding
  `target="_blank"` to outbound links.
- **Client side** — `_data/` markdown fields and list-view previews are rendered in the
  browser by showdown in `public/assets/js/scripts.js`, which re-implements the
  external-link handling and strips `<iframe>`/`<video>` from previews. If you change
  link or embed behaviour, change it in both places.

## History / gotchas

- The project was Jekyll (with Decap CMS on GitLab) → migrated to Astro in `718df886`.
  `_data/` kept its Jekyll-era name and location deliberately; `src/data/index.ts` reads
  from there.
- Commit `0d8bc729` ("sync latest changes from gitlab") was a bulk import of divergent
  GitLab state and overwrote some files wholesale. Treat pre-2026 file history with
  suspicion — `git log --follow` across that commit can be misleading.
- Duplicate work entries exist (e.g. two "Mini-docs — neighbourhood spotlights" files, one
  unpublished). Check for a near-identical sibling before assuming a work item is unique.
