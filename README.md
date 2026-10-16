# Terriaki portfolio

A static, GitHub Pages-ready portfolio for **Tristan Castillon**, known online as **Terriaki**, **Terriakidesuuu**, and **TerriA**.

## Structure

- `index.html` — home page
- `gallery.html` — projects, artwork gallery, filters, lightbox, and public repositories
- `about.html` — artist profile and contact link
- `css/` — base tokens, reusable components, and page layouts
- `js/` — shared page behavior and gallery interactions
- `assets/` — original source media and compressed web-ready media
- `scripts/optimize-media.ps1` — repeatable FFmpeg optimization script

## GitHub Pages

This is a dependency-free static site. Publish the repository root with GitHub Pages using **Deploy from a branch** and the `main` branch root folder. The included `.nojekyll`, `robots.txt`, and `sitemap.xml` are ready for deployment.

The canonical URLs currently assume the repository is published at:

`https://terriakidesu.github.io/portfolio/`

If the repository uses another name or a custom domain, update the canonical, Open Graph, JSON-LD, `robots.txt`, and `sitemap.xml` URLs before publishing.

## Media

Original artwork and video files remain in their source folders. The pages use the files in `assets/optimized/`; these include WebP artwork, WebP video posters, and browser-friendly H.264 MP4 timelapses.
