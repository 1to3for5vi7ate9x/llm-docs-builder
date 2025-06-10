---
title: Getting Started
description: Quick start guide for LLM Docs Builder
author: LLM Docs Team
date: 2024-01-10
order: 1
---

# Getting Started with LLM Docs Builder

Welcome to LLM Docs Builder! This platform serves your documentation in two formats:
- **HTML** for human readers (browsers)
- **Markdown** for LLMs and CLI tools (curl, wget)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/llm-docs-builder.git
cd llm-docs-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Your docs will be available at `http://localhost:3000`

## Adding Your Documentation

1. Add markdown files to the `/docs` directory
2. Include front matter for metadata (optional):

```yaml
---
title: Your Page Title
description: Brief description
author: Your Name
date: 2024-01-10
order: 1
---
```

3. Write your content in markdown
4. Save and refresh - changes are detected automatically!

## Testing Bot Detection

Use the included test script:
```bash
./test-bot-detection.sh
```

Or test manually:
```bash
# Get markdown (as bot/LLM)
curl http://localhost:3000/

# Get HTML (as browser)
curl -H "User-Agent: Mozilla/5.0" http://localhost:3000/
```