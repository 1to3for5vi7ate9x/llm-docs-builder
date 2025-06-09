---
title: Welcome to LLM Docs Builder
description: A documentation framework that serves HTML to humans and markdown to LLMs
order: 1
---

## Overview

LLM Docs Builder is a modern documentation framework designed with dual audiences in mind:

- **Humans**: Get a beautiful, styled HTML interface with navigation, search, and responsive design
- **LLMs/Bots**: Receive clean, raw markdown content optimized for AI consumption

## Key Features

- **Automatic Content Detection**: Intelligently detects whether a request is from a browser or a bot/LLM
- **Markdown-First**: Write your docs in markdown with optional front matter
- **Fast and Lightweight**: Built with Express.js for optimal performance
- **Customizable**: Easy to theme and extend

## How It Works

1. When a browser visits your docs, they see styled HTML
2. When curl, wget, or an LLM fetches the same URL, they get raw markdown
3. No special endpoints needed - same URL, different content based on user agent

## Getting Started

1. Add your markdown files to the `docs` directory
2. Use front matter to add metadata (title, description, order)
3. Start the server with `npm start`
4. Visit `http://localhost:3000` to see your docs

## Example Front Matter

```yaml
---
title: My Documentation Page
description: A brief description of this page
author: Your Name
date: 2024-01-09
order: 2
---
```