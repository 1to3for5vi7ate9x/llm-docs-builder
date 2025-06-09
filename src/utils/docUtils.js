const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../../docs');

// Get list of all documentation files
async function getDocsList() {
  try {
    const files = await fs.readdir(DOCS_DIR);
    const docs = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(DOCS_DIR, file);
        const { data } = await parseMarkdownFile(filePath);
        
        docs.push({
          filename: file,
          url: `/${file.replace('.md', '')}`,
          title: data.title || file.replace('.md', ''),
          description: data.description || '',
          order: data.order || 999
        });
      }
    }
    
    // Sort by order, then alphabetically
    return docs.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
  } catch (error) {
    console.error('Error reading docs directory:', error);
    return [];
  }
}

// Parse a markdown file with front matter
async function parseMarkdownFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(fileContent);
    return { content, data };
  } catch (error) {
    throw new Error(`Error reading file ${filePath}: ${error.message}`);
  }
}

// Create docs directory if it doesn't exist
async function ensureDocsDirectory() {
  try {
    await fs.access(DOCS_DIR);
  } catch {
    await fs.mkdir(DOCS_DIR, { recursive: true });
  }
}

module.exports = {
  getDocsList,
  parseMarkdownFile,
  ensureDocsDirectory,
  DOCS_DIR
};