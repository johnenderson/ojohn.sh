# Development

Development notes for `ojohn.sh`.

## Requirements

- Node 22, preferably via `nvm`
- Yarn 1.x

```bash
nvm install 22.15.0
nvm use 22.15.0

npm install -g yarn
yarn install
yarn dev
```

The site runs at `http://localhost:3000`.

## Commands

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `yarn dev`            | Start the development server                   |
| `yarn build`          | Build the production site                      |
| `yarn start`          | Start the production server after `yarn build` |
| `yarn lint`           | Run ESLint against `app` and `src`             |
| `yarn typecheck`      | Run TypeScript checks                          |
| `yarn prettier:check` | Check formatting                               |
| `yarn prettier:fix`   | Format supported files                         |

`yarn build` uses `next/font` and may need network access to download Geist
fonts from Google Fonts.

## Project Structure

```text
.
├── app/                # Next.js App Router routes and providers
│   ├── [slug]/         # Article pages generated from content
│   ├── rss.xml/        # RSS route handler
│   ├── me/             # About page
│   └── writings/       # Article index
├── content/            # Article content and metadata
├── src/
│   ├── base/           # Shared UI, article, hooks, and graph components
│   ├── features/       # Page/domain-specific features
│   │   ├── articles/   # Article list components and content loaders
│   │   └── home/       # Home-specific components
│   ├── lib/            # Shared helpers and integrations
│   └── types/          # Shared TypeScript types
├── public/             # Static assets
└── styles/             # Global CSS and syntax highlighting styles
```

## Adding Content

Each article lives in one or more locale folders:

```text
content/<slug>/
├── en/
│   └── index.mdx
└── pt-BR/
    └── index.mdx
```

Example article:

```mdx
---
title: 'Article title'
description: 'Short description'
date: '2026-01-05'
tags: ['example', 'nextjs', 'performance']
coverImage:
  src: '/article-slug/cover.jpg'
  width: '640'
  height: '425'
  alt: 'Cover image description'
  authorHref: ''
  authorName: ''
---

Article body.
```

The article body goes below the frontmatter. Headings receive IDs through the MDX
pipeline and are used by the article table of contents.

Article imports are generated from the `content` folder by:

```bash
yarn content:sync
```

`yarn dev`, `yarn build`, `yarn lint`, and `yarn typecheck` run this automatically.
Keeping generated raw MDX imports in the module graph lets Next.js and
Turbopack handle local HMR for article edits without custom polling or
development-only API endpoints.

## MDX Components

The MDX renderer supports:

- GitHub Flavored Markdown tables and lists via `remark-gfm`
- Syntax highlighting via Shiki
- Math with `<InlineMath>` and `<BlockMath>`
- `<Admonition>`, `<Info>`, `<Note>`, `<Tip>`, `<Warning>`, and `<Danger>`
- `<PostAndDate>`
- `<SideBySideImages>`
- `<SideBySideVideos>`
- `<SmoothRender>` (applied automatically by the article renderer)
- `<TweetEmbed>`
- `<Venn>`

Example:

```mdx
Intro paragraph.

<InlineMath math="E = mc^2" />

<BlockMath math="\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}" />
```

## Preferences

The navbar includes a preferences panel for:

- theme: system, light, or dark
- content text size: `14px`, `16px`, `17px`, `18px`, or `20px`

The selected text size is stored in `localStorage` as `prose_font_size` and
applied through the `--prose-font-size` CSS variable.
