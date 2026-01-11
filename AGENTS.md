# AGENTS.md

Guidelines for AI coding assistants working with this Jekyll blog.

## Project Overview

Personal technical blog built with Jekyll, hosted on GitHub Pages at **codesilva.com**. Features dark mode, auto-generated table of contents, and bilingual content (Portuguese/English).

**Author**: Edy Silva - Developer Relations at Codeminer42, Node.js contributor

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Jekyll | 4.3.2 | Static site generator |
| Ruby | 3.3.0 | Runtime (see .tool-versions) |
| Minima | ~2.5 | Base theme (heavily customized) |
| Node.js | 24.4.1 | Tooling (see .tool-versions) |

**Plugins**: jekyll-feed, jekyll-toc, jekyll-sitemap, jekyll-polyglot

## Project Structure

```
├── _posts/           # Published blog posts (YYYY-MM-DD-title.md)
├── _drafts/          # Draft posts (not published)
├── _layouts/         # Page templates (post.html, category.html, book.html)
├── _includes/        # Reusable components (head.html, footer.html)
├── _data/            # YAML data files (books.yml, talks.yml, i18n.yml)
├── _category/        # Category collection pages
├── _book_cc_for_ppl_in_a_hurry/  # Book collection
├── assets/
│   ├── css/          # dark-mode.css, toc.css
│   ├── js/           # dark-mode.js, toc.js
│   └── images/       # Blog images
├── computer-science/ # Code projects and examples
└── Root pages        # about.md, books.md, talks.md, index.md
```

## Development Commands

```bash
bundle install              # Install Ruby dependencies
bundle exec jekyll serve    # Local server at localhost:4000
bundle exec jekyll build    # Build to _site/
```

## Critical Files Reference

| File | Purpose |
|------|---------|
| `_config.yml` | Site config, plugins, collections, defaults |
| `assets/css/dark-mode.css` | Complete theme system + syntax highlighting |
| `assets/css/toc.css` | Table of contents styling |
| `assets/js/dark-mode.js` | Theme toggle, localStorage persistence |
| `assets/js/toc.js` | TOC generation, scroll spy, progress bar |
| `_includes/head.html` | Meta tags, early theme script, conditional assets |
| `_layouts/post.html` | Blog post template with desktop/mobile TOC |

## Blog Post Conventions

### Filename Format
```
YYYY-MM-DD-post-slug.md
```

### Required Frontmatter
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
lang: pt-BR  # or en-US
tags: [tag1, tag2]
categories: [category]
---
```

### Optional Frontmatter
```yaml
excerpt: "Custom excerpt for listings"
chapter: 1        # For series/sequential posts
private: true     # Mark as draft
```

### Language
- **Primary language**: Portuguese (pt-BR)
- **Secondary**: English (en-US)
- Always set `lang` field in frontmatter

## Dark Mode System (REQUIRED)

**All styling MUST support both light and dark themes.**

### CSS Variables (defined in `assets/css/dark-mode.css`)

```css
/* Colors */
--bg-color              /* Page background */
--text-color            /* Body text */
--heading-color         /* h1-h6 */
--link-color            /* Links */
--link-hover-color      /* Link hover state */
--secondary-text        /* Muted text, meta */

/* Code */
--code-bg               /* Code block background */
--code-text             /* Code text color */

/* UI Elements */
--border-color          /* Borders, dividers */
--header-bg             /* Header/nav background */
--card-bg               /* Card backgrounds */
--card-hover-bg         /* Card hover state */
--shadow-color          /* Box shadows */

/* Selection */
--selection-bg          /* Text selection background */
--selection-text        /* Text selection color */
```

### How to Add New Styles

```css
/* Always use variables, NEVER hardcode colors */
.my-element {
  color: var(--text-color);
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
}

/* For dark-mode-specific overrides */
[data-theme="dark"] .my-element {
  /* dark-only styles */
}

/* For system preference detection (required for completeness) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .my-element {
    /* same dark styles */
  }
}
```

### Syntax Highlighting

Code blocks use Rouge highlighter with Dracula-inspired dark theme colors:

| Token | Class | Dark Color | Purpose |
|-------|-------|------------|---------|
| Comments | `.c`, `.c1`, `.cm` | `#6a737d` | Gray |
| Keywords | `.k`, `.kd`, `.kn` | `#ff79c6` | Pink |
| Strings | `.s`, `.s1`, `.s2` | `#f1fa8c` | Yellow |
| Numbers | `.m`, `.mi`, `.mf` | `#bd93f9` | Purple |
| Functions | `.nf`, `.nd` | `#50fa7b` | Green |
| Classes | `.nc`, `.nb` | `#8be9fd` | Cyan |
| Errors | `.err` | `#ff5555` | Red |

## JavaScript Patterns

Follow existing patterns in `assets/js/`:

```javascript
(function() {
  'use strict';

  // IIFE for encapsulation
  // localStorage for user preferences
  // matchMedia for system preference detection
  // requestAnimationFrame for animations
  // Defensive null checks

  function init() {
    // Initialize on DOMContentLoaded or immediately if DOM ready
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

## CSS Patterns

- **CSS custom properties** for all colors/theming
- **Mobile-first** responsive design
- **Smooth transitions** for interactive elements
- **Focus states** for accessibility (`:focus`, `:focus-visible`)
- **BEM-like naming** when creating new components

## Accessibility Requirements

- Use semantic HTML (`<article>`, `<nav>`, `<main>`)
- Include `aria-label` for icon-only buttons
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Test with screen readers when possible

## Collections

Defined in `_config.yml`:

1. **book_cc_for_ppl_in_a_hurry**
   - Path: `/_book_cc_for_ppl_in_a_hurry/`
   - URL: `/cc-para-apressados/:path`
   - Layout: `book`

2. **category**
   - Path: `/_category/`
   - URL: `/:path`
   - Layout: `category`

## Data Files

| File | Content |
|------|---------|
| `_data/books.yml` | Published books with store links |
| `_data/talks.yml` | Presentations and talks |
| `_data/i18n.yml` | Internationalization labels |

## What NOT to Do

- **Don't hardcode colors** - always use CSS variables
- **Don't skip dark mode** - every visual change needs both themes
- **Don't ignore mobile** - test responsive behavior
- **Don't create new CSS files** without strong justification
- **Don't add inline styles** - use classes and stylesheets
- **Don't skip frontmatter** - posts need proper metadata
- **Don't push untested changes** - run `jekyll serve` first

## Deployment

- **Branch**: `master`
- **Platform**: GitHub Pages
- **Domain**: codesilva.com
- **Process**: Automatic on push to master

No manual build step required - GitHub Pages builds Jekyll automatically.

## Testing Changes

1. Run `bundle exec jekyll serve`
2. Open `http://localhost:4000`
3. Test both light and dark modes (toggle button in header)
4. Test on mobile viewport (responsive design)
5. Verify code blocks render correctly
6. Check TOC generation on posts with headings
