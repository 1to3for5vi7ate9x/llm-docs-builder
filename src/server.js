const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { marked } = require('marked');
const matter = require('gray-matter');
const botDetector = require('./middleware/botDetector');
const markdownRouter = require('./routes/markdown');

const app = express();
const PORT = process.env.PORT || 3000;

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