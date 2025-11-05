# AGENTS.md

## Build Commands
- **Jekyll site**: `bundle exec jekyll serve` (development) or `bundle exec jekyll build` (production)
- **Install dependencies**: `bundle install`
- **Node.js projects**: `npm install` then `npm run dev` (development) or `npm run build` (production)
- **Linting**: `npm run lint` (for Node.js projects with ESLint)
- **Testing**: No unified test framework - check individual project directories

## Code Style Guidelines

### Jekyll/Markdown
- Use Portuguese (pt-BR) as primary language
- Front matter in YAML format
- File names: kebab-case for posts and drafts
- Use Jekyll collections for organized content (book_cc_for_ppl_in_a_hurry, category)

### JavaScript/TypeScript
- ES6+ modules with import/export
- ESLint configuration follows React recommended rules
- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Prefer const over let when possible

### CSS
- Use CSS custom properties (variables) for theming
- BEM methodology for class naming when applicable
- Mobile-first responsive design

### General
- Commit messages in Portuguese when possible
- Follow existing file structure and naming patterns
- Use absolute paths for file operations
- Include proper error handling with try/catch blocks
- Add meaningful comments only when necessary