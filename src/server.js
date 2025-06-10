const express = require('express');
require('dotenv').config();
const path = require('path');
const fs = require('fs').promises;
const { marked } = require('marked');
const matter = require('gray-matter');
const botDetector = require('./middleware/botDetector');
const markdownRouter = require('./routes/markdown');

const app = express();
const PORT = process.env.PORT || 3000;

// Site configuration from environment
const siteConfig = {
  title: process.env.SITE_TITLE || 'LLM Docs Builder',
  description: process.env.SITE_DESCRIPTION || 'Documentation that serves HTML to humans and markdown to LLMs',
  author: process.env.SITE_AUTHOR || '',
  url: process.env.SITE_URL || `http://localhost:${PORT}`
};

// Make site config available to all views
app.locals.siteConfig = siteConfig;

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(botDetector);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', markdownRouter);

// 404 handler
app.use((req, res) => {
  const isBot = req.isBot;
  
  if (isBot) {
    res.status(404).type('text/plain').send('# 404 - Page Not Found\n\nThe requested documentation page does not exist.');
  } else {
    res.status(404).render('layout', { 
      title: '404 - Page Not Found',
      template: '404'
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const isBot = req.isBot;
  
  if (isBot) {
    res.status(500).type('text/plain').send('# 500 - Internal Server Error\n\nAn error occurred while processing your request.');
  } else {
    res.status(500).render('layout', { 
      title: 'Error', 
      template: 'error',
      error: err 
    });
  }
});

app.listen(PORT, () => {
  console.log(`LLM Docs Builder running on http://localhost:${PORT}`);
});