---
title: API Integration Examples
description: How to integrate LLM Docs with various AI services
author: LLM Docs Team
date: 2024-01-09
order: 3
---

## Overview

This page demonstrates how different LLMs and tools can consume your documentation automatically in markdown format.

## Command Line Tools

### Using curl

```bash
# Basic request
curl https://your-docs.com/api-reference

# With specific headers
curl -H "Accept: text/plain" https://your-docs.com/api-reference

# Save to file
curl https://your-docs.com/api-reference > api-docs.md
```

### Using wget

```bash
# Display in terminal
wget -qO- https://your-docs.com/api-reference

# Save to file
wget https://your-docs.com/api-reference -O api-docs.md
```

### Using HTTPie

```bash
# Simple GET request
http https://your-docs.com/api-reference

# With custom headers
http https://your-docs.com/api-reference Accept:text/plain
```

## Programming Languages

### Python

```python
import requests

# Basic request
response = requests.get('https://your-docs.com/api-reference')
markdown_content = response.text

# With custom headers
headers = {'User-Agent': 'my-bot/1.0'}
response = requests.get('https://your-docs.com/api-reference', headers=headers)
```

### JavaScript/Node.js

```javascript
// Using fetch (Node 18+)
const response = await fetch('https://your-docs.com/api-reference');
const markdown = await response.text();

// Using axios
const axios = require('axios');
const { data } = await axios.get('https://your-docs.com/api-reference');
```

### Go

```go
package main

import (
    "io/ioutil"
    "net/http"
)

func main() {
    resp, _ := http.Get("https://your-docs.com/api-reference")
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
    markdown := string(body)
}
```

## AI/LLM Integration

### OpenAI Function Calling

```python
import openai

functions = [{
    "name": "fetch_documentation",
    "description": "Fetch documentation from URL",
    "parameters": {
        "type": "object",
        "properties": {
            "url": {"type": "string", "description": "Documentation URL"}
        }
    }
}]

# The function will automatically receive markdown
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Read the API docs at https://your-docs.com/api"}],
    functions=functions
)
```

### Anthropic Claude

```python
import anthropic

client = anthropic.Client()

# Claude will automatically receive markdown when fetching URLs
response = client.messages.create(
    model="claude-3-opus-20240229",
    messages=[{
        "role": "user",
        "content": "Please analyze the documentation at https://your-docs.com/api"
    }]
)
```

### LangChain Integration

```python
from langchain.document_loaders import WebBaseLoader
from langchain.llms import OpenAI
from langchain.chains.summarize import load_summarize_chain

# Load documentation (receives markdown automatically)
loader = WebBaseLoader("https://your-docs.com/api-reference")
docs = loader.load()

# Create summarization chain
llm = OpenAI(temperature=0)
chain = load_summarize_chain(llm, chain_type="stuff")

# Summarize the documentation
summary = chain.run(docs)
```

## Web Scraping & Automation

### Playwright

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'doc-scraper-bot/1.0'  // Will receive markdown
  });
  
  const page = await context.newPage();
  await page.goto('https://your-docs.com/api-reference');
  const content = await page.content();
  
  await browser.close();
})();
```

### Puppeteer

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set bot user agent to receive markdown
  await page.setUserAgent('documentation-bot/1.0');
  await page.goto('https://your-docs.com/api-reference');
  
  const markdown = await page.evaluate(() => document.body.innerText);
  
  await browser.close();
})();
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Check Documentation
on: [push]

jobs:
  check-docs:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch API Documentation
        run: |
          curl https://your-docs.com/api-reference > api-docs.md
          echo "Documentation fetched successfully"
      
      - name: Validate Documentation
        run: |
          # Add your validation logic here
          if grep -q "# API Reference" api-docs.md; then
            echo "Documentation is valid"
          else
            echo "Documentation validation failed"
            exit 1
          fi
```

### GitLab CI

```yaml
check-documentation:
  script:
    - wget -qO- https://your-docs.com/api-reference > docs.md
    - cat docs.md | grep "API Reference" || exit 1
```

## Custom Bot User Agents

If you want to ensure your bot receives markdown, use these patterns in your User-Agent:

```
# Explicitly request markdown
User-Agent: my-app/1.0 (compatible; bot; +https://myapp.com)

# Include 'bot' keyword
User-Agent: documentation-bot/2.0

# Include 'llm' keyword  
User-Agent: my-llm-assistant/1.0

# Mimic curl/wget
User-Agent: curl/7.68.0
User-Agent: Wget/1.20.3
```

## Rate Limiting Considerations

When integrating with LLM Docs:

1. **Respect rate limits**: Don't overwhelm the server
2. **Cache responses**: Store fetched documentation locally
3. **Use conditional requests**: Implement If-Modified-Since headers
4. **Batch requests**: Fetch multiple pages efficiently

Example with caching:

```python
import requests
from datetime import datetime, timedelta

class DocsFetcher:
    def __init__(self):
        self.cache = {}
        self.cache_duration = timedelta(hours=1)
    
    def fetch(self, url):
        # Check cache
        if url in self.cache:
            cached_data, timestamp = self.cache[url]
            if datetime.now() - timestamp < self.cache_duration:
                return cached_data
        
        # Fetch fresh data
        response = requests.get(url)
        markdown = response.text
        
        # Update cache
        self.cache[url] = (markdown, datetime.now())
        return markdown
```