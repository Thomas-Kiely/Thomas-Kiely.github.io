# Starter files: lean custom layout for thomas-kiely.github.io

A hand-written replacement for the AcademicPages theme: no sidebar, no jQuery/Font Awesome,
one ~300-line stylesheet and two small scripts. Your existing content collections still work.

## What's in here

| File | Purpose |
|---|---|
| `_layouts/default.html`, `page.html` | Page shell; `page` is for prose pages (research sub-pages, CV, ...) |
| `_layouts/single.html`, `archive.html`, `single-portfolio.html`, `splash.html`, `talk.html`, `archive-taxonomy.html` | One-line shims that forward to `page`, so pages still naming an old AcademicPages layout (your research sub-pages use `single-portfolio`) get the new look |
| `_includes/` | `head`, `nav`, `footer`, `icon` (DOI/arXiv/PDF), `pub-item`, `research-list` |
| `_data/profile.yml` | Name, affiliation, tagline, nav links, social links: edit copy here |
| `_data/research.yml` | The four research themes (title, one-line summary, link, tag) |
| `_data/publications.yml` | All 14 published papers, newest first. **Single source of truth** for the Publications page, the home page's "selected" list and the per-theme paper counts |
| `_data/preprints.yml` | Empty for now; fill in and the Preprints group appears on `/publications/` |
| `index.html`, `research.html`, `publications.html`, `teaching.html` | Pages |
| `assets/css/site.css` | All styling; colors/fonts are CSS variables at the top (light + dark) |
| `assets/js/site.js` | Theme toggle, publication filter, KaTeX rendering |
| `assets/js/bloch.js` | The hero figure: a weakly monitored large spin, Husimi Q function on the Bloch sphere (replaces the earlier `lattice.js`) |

## Quick standalone preview (optional)

To look at this folder by itself before merging it into your repo, you need a `Gemfile` with `gem "jekyll"`
(and `gem "webrick"` on Ruby 3+), then run:

    bundle exec jekyll serve --config _config.standalone.yml

`_config.standalone.yml` is only for this; don't copy it into your real repo.

## Install (do this on a branch)

1. `git checkout -b redesign`
2. Copy everything in this folder into the repo root. Say yes to overwriting `_layouts/`, `_includes/` files with the same names.
3. Merge `_config.additions.yml` into `_config.yml`.
4. **Delete the old pages that claim the same URLs**, or Jekyll will have two pages for one permalink:
   whichever of `_pages/about.md` (the `/` home page), and the old pages for `/research/`, `/publications/`,
   `/preprints/`, `/teaching/`. Keep your CV page and the four research sub-pages.
5. `bundle exec jekyll serve` and open http://localhost:4000. If something looks off, check the
   "Things to verify" list below. Everything left over from AcademicPages (old `_sass/`, old `_includes/`,
   `_publications/`, `_preprints/`) is simply unused and can be deleted once you're happy.

## If a page looks raw or shows a big headshot

My layouts never put a headshot on sub-pages, so a page that does is still going through an *old* AcademicPages
layout (its sidebar/author-profile include). Check which layouts your pages ask for and what exists:

    grep -rh "^layout:" _research _pages _teaching _talks 2>/dev/null | sort | uniq -c
    ls _layouts

Also read the terminal where `jekyll serve` is running: a line like `Layout 'xyz' requested in ... does not exist`
means that page is rendering with no layout at all (which looks raw).

Fix: turn every leftover layout into a one-line shim that forwards to the new `page` layout. From the repo root:

    for f in _layouts/*.html; do
      case "$(basename "$f")" in default.html|page.html) ;;
        *) printf -- '---\nlayout: page\n---\n{{ content }}\n' > "$f" ;;
      esac
    done

and, if a page names a layout that doesn't exist, create `_layouts/<that name>.html` with the same three lines.
(Pages that write their own `# Title` heading will then show it twice; delete one.)

## Search visibility (SEO)

- `_data/profile.yml` holds the search-result title/description, your publication name (`alternate_names`, so
  "Thomas G. Kiely" is tied to you), affiliation, and profile links. `head.html` turns these into the page title,
  Open Graph tags, and a schema.org `ProfilePage`/`Person` block on the home page.
- **Sitemap**: AcademicPages normally ships the `jekyll-sitemap` plugin. After a build, check `_site/sitemap.xml`
  exists. If it doesn't, copy `_optional/sitemap.xml` to the repo root. If it does, leave `_optional/` alone.
- `robots.txt` points crawlers at the sitemap.
- In `_config.yml`, set `output: false` for the `publications` and `preprints` collections (see
  `_config.additions.yml`) so the old title-only paper pages don't appear in search.
- After deploying: add the site in Google Search Console, submit `/sitemap.xml`, and (optionally) paste the
  verification token into `google_site_verification` in `profile.yml`.

## If the hero figure doesn't appear

1. Hard-refresh (Chrome/Firefox: Cmd+Shift+R; Safari: Option+Cmd+E, then reload). A cached `site.css` from
   the previous version leaves the figure with zero height.
2. Make sure *all* of these were replaced together: `index.html`, `_includes/head.html`, `assets/css/site.css`,
   `assets/js/bloch.js`. Quick check: `grep -c bloch _includes/head.html index.html` should be non-zero for both,
   and `grep -c "\.sphere" assets/css/site.css` should be non-zero.
3. Open the browser's JavaScript console (Chrome: Cmd+Option+J; Safari: Develop > Show JavaScript Console) and
   look for a red error or a 404 for `bloch.js`.

## Things to verify (I could not read your repo's files)

- **Publication data** was transcribed from the live page. Please proofread `_data/publications.yml`:
  the topic `tags` are my best guesses (a paper can have several), and the Phys. Rev. A 110, 062615 PDF
  link currently has no `.pdf` extension (same as on your live site).
- **Your existing CV and research sub-pages** use whatever front matter they have today. If they use
  `layout: single` they will pick up the new style via the shim. If a page also writes its own `# Title`
  heading, you'll see it twice (the layout prints `title` as the page heading); remove one.
- **Teaching page** loops over `site.teaching` using the standard AcademicPages fields
  (`title`, `venue`, `location`, `date`, excerpt). Adjust `teaching.html` if yours differ.
- **Headshot crop**: `headshot_position` in `_data/profile.yml` moves the circular crop (see the comment there).
- **Icons**: the DOI/arXiv/PDF icons are simple inline SVGs in `_includes/icon.html`. Swap in your own if you prefer.
- **Fonts and math** load from Google Fonts and the cdnjs KaTeX CDN. To self-host later, download the fonts
  and point `head.html` at local files.
- Maths in titles: wrap it in `$...$` (e.g. `Continuous Wigner-Mott transition at $\nu=1/5$`).

## Everyday edits

- **Add a paper**: add an entry at the top of `_data/publications.yml`. Set `selected: true` to show it on the home page.
- **Change the tagline or links**: `_data/profile.yml`.
- **Change colors**: the variables at the top of `assets/css/site.css`. `--accent` is the one color; `--measure` (amber) is reserved for measurement events and the Editor's Suggestion badge.
- **Hero figure**: parameters (spin length `S`, measurement strength `GAMMA`, field `FIELD_ON`, clock `RATE`, camera tilt `TAU`) are at the top of `assets/js/bloch.js`. The core physics sits between the `CORE-START` / `CORE-END` markers. It pauses off-screen and shows a still snapshot for visitors who prefer reduced motion.

## Tested

The CSS, filter, theme toggle and hero figure were exercised in a headless browser (light/dark, desktop/phone,
reduced motion) against a static stand-in for the Jekyll output. The hero's physics core was tested in isolation:
coherent-state geometry, exact precession about x, norm conservation, and the Born rule for the measurement
record (variance of the collapsed S_z outcomes 12.4 +- 0.2 vs the exact S/2 = 12.5). Your own `jekyll serve` run
has since exercised the Liquid templates.
