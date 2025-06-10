# LLM Docs Builder

A documentation framework that automatically serves HTML to humans and markdown to LLMs/bots. Perfect for creating documentation that's both human-readable and LLM-friendly without maintaining separate versions.

## 🚀 How to Use This for Your Own Docs

### Option 1: Deploy Your Own Instance (Recommended)

1. **Fork or Use as Template**
   - Click "Use this template" on GitHub to create your own repository
   - Or fork this repository

2. **Add Your Documentation**
   ```bash
   # Clone your new repo
   git clone https://github.com/YOUR-USERNAME/YOUR-DOCS.git
   cd YOUR-DOCS
   
   # Remove example docs
   rm -rf docs/*
   
   # Add your own markdown files to docs/
   # Example: docs/introduction.md, docs/api-guide.md, etc.
   ```

3. **Deploy to Vercel (Free)**
   - Push your changes to GitHub
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Click Deploy - that's it!

4. **Your docs are now live!**
   - Browsers see: `https://your-docs.vercel.app/introduction` (HTML)
   - LLMs/CLI get: `curl https://your-docs.vercel.app/introduction` (Markdown)

### Option 2: Run Locally

```bash
# Clone and setup
git clone https://github.com/your-username/llm-docs-builder.git
cd llm-docs-builder

# Add your docs to /docs folder
# Install and run
npm install
npm run dev

# Visit http://localhost:3000
```

### Writing Documentation

Just create `.md` files in the `/docs` folder:

```markdown
---
title: Your Page Title
description: Brief description
order: 1  # Controls navigation order
---

# Your Content Here

Write in markdown as usual...
```

## Quick Start

```bash
# Clone the repository
git clone <your-repo>
cd llm-docs-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## Test It Out

```bash
# Get markdown (bot/LLM view)
curl http://localhost:3000

# Get HTML (browser view)
open http://localhost:3000

# Run automated tests
./test-bot-detection.sh
```

## Features

- 🤖 **Smart Detection**: Automatically detects bots/LLMs and serves appropriate content
- 🎨 **Beautiful UI**: Styled HTML interface for human readers with syntax highlighting
- 📝 **Markdown-First**: Write docs in markdown with YAML front matter
- ⚡ **Fast & Lightweight**: Built on Express.js for optimal performance
- 🔧 **Extensible**: Easy to customize themes and add features
- 📱 **Responsive**: Mobile-friendly design out of the box

## How It Works

The bot detection middleware examines the User-Agent header and Accept headers to determine the client type:

### For Bots/LLMs (detected patterns):
- curl, wget, httpie
- Python requests, axios, node-fetch
- OpenAI, Claude, GPT crawlers
- Search engine bots
- Missing User-Agent
- Requests preferring text/plain

**Response**: Clean markdown content

### For Browsers:
- Standard browser User-Agents
- Requests accepting text/html

**Response**: Styled HTML with navigation

## Project Structure

```
llm-docs-builder/
├── src/
│   ├── server.js           # Main Express server
│   ├── middleware/
│   │   └── botDetector.js  # User-agent detection
│   ├── routes/
│   │   └── markdown.js     # Route handlers
│   ├── utils/
│   │   └── docUtils.js     # Document utilities
│   └── views/              # EJS templates
│       ├── layout.ejs
│       ├── index.ejs
│       ├── doc.ejs
│       ├── 404.ejs
│       └── error.ejs
├── docs/                   # Your markdown docs
│   ├── index.md
│   └── usage.md
├── public/                 # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── package.json
└── README.md
```

## Writing Documentation

### Basic Markdown File

Create files in the `docs` directory:

```markdown
---
title: API Reference
description: Complete API documentation
author: Your Name
date: 2024-01-09
order: 3
---

# API Reference

Your markdown content here...
```

### Front Matter Options

| Field | Type | Description |
|-------|------|-------------|
| title | string | Page title (required) |
| description | string | Brief description for index |
| author | string | Author name |
| date | string/date | Publication date |
| order | number | Sort order in navigation |
| tags | array | Tags for categorization |

### Supported Markdown Features

- Headers (h1-h6)
- **Bold** and *italic* text
- [Links](https://example.com)
- `inline code` and code blocks with syntax highlighting
- Lists (ordered and unordered)
- Tables
- Blockquotes
- Images
- HTML (when needed)

## API Examples

### Testing Bot Detection

```bash
# Standard curl (gets markdown)
curl http://localhost:3000/usage

# Simulate browser (gets HTML)
curl -H "User-Agent: Mozilla/5.0" http://localhost:3000/usage

# Using wget (gets markdown)
wget -qO- http://localhost:3000/usage

# Python requests (gets markdown)
python -c "import requests; print(requests.get('http://localhost:3000').text)"
```

### LLM Integration Examples

```python
# OpenAI GPT
import openai

# The LLM will automatically receive markdown
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{
        "role": "user",
        "content": "Fetch and summarize: http://your-docs.com/api-reference"
    }]
)
```

```javascript
// Claude AI via Anthropic SDK
const response = await anthropic.messages.create({
    model: "claude-3",
    messages: [{
        role: "user",
        content: "Read the docs at http://your-docs.com/usage"
    }]
});
// Claude receives clean markdown automatically
```

## Deployment

### Environment Variables

```bash
PORT=3000                    # Server port
NODE_ENV=production         # Production mode
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Heroku

```bash
heroku create your-app-name
git push heroku main
```

### Deploy with Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
```

## Customization

### Modifying the Theme

Edit `public/css/style.css` to customize colors, fonts, and layout:

```css
:root {
  --primary-color: #2563eb;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --border-color: #e5e7eb;
  --code-bg: #f3f4f6;
}
```

### Adding Bot Patterns

Edit `src/middleware/botDetector.js` to add new bot patterns:

```javascript
const botPatterns = [
  /your-bot-pattern/i,
  // ... existing patterns
];
```

### Extending Routes

Add new routes in `src/routes/markdown.js` for custom functionality.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] PDF export
- [ ] Multi-language support
- [ ] Versioning system
- [ ] API analytics
- [ ] Webhook integrations

## License

MIT License - see LICENSE file for details

## Support

- Issues: [GitHub Issues](https://github.com/yourusername/llm-docs-builder/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/llm-docs-builder/discussions)
- Email: your-email@example.com