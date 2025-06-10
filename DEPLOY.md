# Deploying LLM Docs Builder to Vercel

This guide will help you deploy your LLM Docs Builder to Vercel, making it available for anyone to use for their documentation needs.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works fine)
- Git repository with your docs (GitHub, GitLab, or Bitbucket)
- Node.js 14.x or higher

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fllm-docs-builder)

## Manual Deployment Steps

### 1. Fork or Clone This Repository

```bash
git clone https://github.com/your-username/llm-docs-builder.git
cd llm-docs-builder
```

### 2. Add Your Documentation

Replace the example docs in the `/docs` directory with your own markdown files:

```bash
rm -rf docs/*
# Add your own .md files to docs/
```

### 3. Install Dependencies Locally (Optional)

```bash
npm install
npm run dev  # Test locally at http://localhost:3000
```

### 4. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to link your project and deploy.

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure your project:
   - Framework Preset: Other
   - Build Command: `npm run build` (or leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

### 5. Configure Environment Variables (Optional)

In your Vercel project dashboard, go to Settings → Environment Variables and add:

- `SITE_TITLE` - Your documentation site title
- `SITE_DESCRIPTION` - Site description
- `SITE_AUTHOR` - Your name or organization
- `SITE_URL` - Your custom domain (if using one)

### 6. Custom Domain (Optional)

1. Go to your project Settings → Domains
2. Add your custom domain
3. Follow Vercel's instructions for DNS configuration

## How It Works

Once deployed, your documentation site will:

- **For browsers**: Serve beautifully styled HTML documentation
- **For LLMs/bots** (curl, wget, etc.): Serve raw markdown for easy parsing

Test it yourself:
```bash
# Browser gets HTML
open https://your-site.vercel.app/

# CLI tools get markdown
curl https://your-site.vercel.app/
```

## Customizing Your Deployment

### Adding Documentation

Simply add `.md` files to the `/docs` directory. Each file can include front matter:

```markdown
---
title: My Page Title
description: A brief description
author: Your Name
date: 2024-01-10
order: 1
---

# Your Content Here

Your markdown content...
```

### Styling

Modify `/public/css/style.css` to customize the appearance of your HTML documentation.

### Bot Detection

The bot detection middleware (`/src/middleware/botDetector.js`) automatically detects various user agents. You can add more patterns if needed.

## Troubleshooting

### Build Errors

- Ensure all dependencies are listed in `package.json`
- Check that Node.js version matches the `engines` field
- Review Vercel build logs for specific errors

### 404 Errors

- Verify your markdown files are in the `/docs` directory
- Check file permissions
- Ensure file extensions are `.md`

### Environment Variables Not Working

- Redeploy after adding environment variables
- Check variable names match exactly
- Use Vercel's preview deployments to test changes

## Support

For issues or questions:
- Open an issue in the repository
- Check Vercel's [documentation](https://vercel.com/docs)
- Review the [example documentation](https://github.com/your-username/llm-docs-builder/tree/main/docs) structure