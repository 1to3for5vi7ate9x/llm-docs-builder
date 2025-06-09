// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
});

// Add styles for copy button
const style = document.createElement('style');
style.textContent = `
  .copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #6b7280;
    color: white;
    border: none;
    border-radius: 3px;
    font-size: 0.8rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  pre:hover .copy-button {
    opacity: 1;
  }
  
  .copy-button:hover {
    background-color: #4b5563;
  }
`;
document.head.appendChild(style);