---
title: Configuration
description: How to configure your LLM Docs Builder instance
author: LLM Docs Team
date: 2024-01-10
order: 3
---

# Configuration

LLM Docs Builder can be customized through environment variables and configuration files.

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Site Configuration
SITE_TITLE=My Documentation
SITE_DESCRIPTION=Documentation that serves HTML to humans and markdown to LLMs
SITE_AUTHOR=Your Name

# Server Configuration
PORT=3000
NODE_ENV=production

# Optional: Custom domain for production
SITE_URL=https://yourdomain.com
```

## Front Matter Options

Each markdown file can include YAML front matter:

```yaml
---
title: Page Title          # Used in HTML title and navigation
description: Brief summary # Used in meta tags
author: Author Name       # Document author
date: 2024-01-10         # Publication date
order: 1                 # Sort order in navigation (lower = first)
---
```

## Customizing Styles

Edit `/public/css/style.css` to customize the appearance:

```css
:root {
  --primary-color: #0066cc;
  --text-color: #333;
  --bg-color: #ffffff;
  --code-bg: #f5f5f5;
}
```

## Bot Detection Patterns

The bot detector checks for these patterns in User-Agent headers:

- CLI tools: curl, wget, httpie
- Programming languages: python, ruby, java, node
- Web crawlers: googlebot, bingbot, slurp
- LLM services: openai, anthropic, gpt
- And many more...

To add custom patterns, edit `/src/middleware/botDetector.js`.

## File Structure

```
llm-docs-builder/
├── docs/           # Your markdown documentation
├── public/         # Static assets (CSS, JS)
├── src/
│   ├── middleware/ # Express middleware
│   ├── routes/     # Route handlers
│   ├── utils/      # Utility functions
│   └── views/      # EJS templates
└── vercel.json     # Vercel deployment config
```