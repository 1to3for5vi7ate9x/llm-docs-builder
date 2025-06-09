// Middleware to detect bot/LLM requests
const botDetector = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const acceptHeader = req.headers['accept'] || '';
  
  // Common bot/CLI tool patterns
  const botPatterns = [
    /curl/i,
    /wget/i,
    /python-requests/i,
    /axios/i,
    /node-fetch/i,
    /postman/i,
    /insomnia/i,
    /httpie/i,
    /lynx/i,
    /w3m/i,
    /links/i,
    /elinks/i,
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /slackbot/i,
    /discord/i,
    /telegrambot/i,
    /skypeuri/i,
    /gpt/i,
    /claude/i,
    /openai/i,
    /anthropic/i,
    /llm/i,
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i
  ];
  
  // Check if request is from a bot
  const isBot = botPatterns.some(pattern => pattern.test(userAgent)) ||
                 acceptHeader.includes('text/plain') ||
                 acceptHeader === '*/*' && !acceptHeader.includes('text/html') ||
                 !userAgent;
  
  // Add isBot flag to request object
  req.isBot = isBot;
  
  next();
};

module.exports = botDetector;