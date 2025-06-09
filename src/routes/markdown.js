const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { marked } = require('marked');
const matter = require('gray-matter');
const { getDocsList, parseMarkdownFile } = require('../utils/docUtils');

const router = express.Router();

// Home page
router.get('/', async (req, res) => {
  try {
    const docs = await getDocsList();
    
    if (req.isBot) {
      // Return markdown index for bots
      let markdown = '# Documentation Index\n\n';
      markdown += 'Welcome to the documentation. Available pages:\n\n';
      docs.forEach(doc => {
        markdown += `- [${doc.title}](${doc.url})\n`;
      });
      
      res.type('text/plain').send(markdown);
    } else {
      // Render HTML for humans
      res.render('layout', { 
        title: 'Documentation', 
        template: 'index',
        docs 
      });
    }
  } catch (error) {
    next(error);
  }
});

// Documentation pages
router.get('/*', async (req, res, next) => {
  try {
    let docPath = req.params[0] || 'index';
    
    // Remove trailing slash
    if (docPath.endsWith('/')) {
      docPath = docPath.slice(0, -1);
    }
    
    // Add .md extension if not present
    if (!docPath.endsWith('.md')) {
      docPath += '.md';
    }
    
    const filePath = path.join(__dirname, '../../docs', docPath);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return next();
    }
    
    // Parse markdown file
    const { content, data } = await parseMarkdownFile(filePath);
    
    if (req.isBot) {
      // Return raw markdown for bots
      const fullMarkdown = data.title ? `# ${data.title}\n\n${content}` : content;
      res.type('text/plain').send(fullMarkdown);
    } else {
      // Render HTML for humans
      const html = marked(content);
      res.render('layout', {
        title: data.title || 'Documentation',
        template: 'doc',
        content: html,
        metadata: data
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;