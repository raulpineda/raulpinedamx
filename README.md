# raulpineda.mx

Personal site built with [11ty](https://www.11ty.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## Development

```bash
pnpm install
pnpm dev     # http://localhost:8080
pnpm build   # outputs to _site/
```

## Structure

```
src/
├── _data/site.json        # site content and metadata
├── _includes/             # layouts and partials
├── js/                    # vanilla JS (grid, menu, typewriter, scroll)
├── posts/                 # markdown blog posts
├── styles/styles.css      # Tailwind + custom CSS
├── index.njk              # home page
└── 404.njk                # error page
```

## Easter egg

Try the Konami code.
