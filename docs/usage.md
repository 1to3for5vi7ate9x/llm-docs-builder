---
title: Usage Guide
description: Learn how to use LLM Docs Builder effectively
order: 2
---

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd llm-docs-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Writing Documentation

### File Structure

Place all your documentation files in the `docs` directory:

```
docs/
├── index.md          # Home page
├── usage.md          # This file
├── api-reference.md  # API docs
└── tutorials/        # Subdirectories supported
    └── getting-started.md
```

### Markdown Syntax

Write standard markdown with all common features supported:

- **Bold** and *italic* text
- [Links](https://example.com)
- `inline code` and code blocks
- Lists (ordered and unordered)
- Tables
- Blockquotes
- Images

### Front Matter

Add metadata to your documents using YAML front matter:

```yaml
---
title: Page Title
description: Brief description for index pages
author: Author Name
date: 2024-01-09
order: 1  # Controls sort order in navigation
tags: [tutorial, beginner]
---
```

## Testing Bot Detection

Test how your docs appear to bots using curl:

```bash
# Get markdown version
curl http://localhost:3000/usage

# Get HTML version (simulate browser)
curl -H "User-Agent: Mozilla/5.0" http://localhost:3000/usage
```

## Deployment

Deploy to any Node.js hosting platform:

1. Set `NODE_ENV=production`
2. Configure your PORT environment variable
3. Run `npm start`

Popular deployment options:
- Heroku
- Vercel
- Railway
- DigitalOcean App Platform
- AWS Elastic Beanstalk