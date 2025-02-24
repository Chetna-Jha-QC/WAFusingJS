const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Middleware for WAF - Blocks SQL Injection, XSS, Directory Traversal
const wafMiddleware = (req, res, next) => {
    const badPatterns = [
        /\b(SELECT|DROP|DELETE|INSERT|UPDATE|UNION|EXEC|ALTER|CREATE|TRUNCATE|REPLACE)\b/i, // SQL Injection
        /<script[\s\S]*?>|<iframe[\s\S]*?>|<svg[\s\S]*?>|on\w+\s*=/i, // XSS Attack
        /<[^>]*>/, // General HTML tag filtering
        /(\balert\b|\bprompt\b|\bconfirm\b)/i, // JavaScript popups
        /(\bfetch\b|\bXMLHttpRequest\b|\baxios\b)/i, // Blocks network requests
        /(\bimport\b|\brequire\b)/i, // Blocks JavaScript module imports
        /(\bfs\b|\bpath\b|\bos\b|\bchild_process\b)/i, // Blocks Node.js dangerous functions
        /(\b__dirname\b|\b__filename\b)/i, // Blocks access to environment variables
        /(\bsetTimeout\b|\bsetInterval\b)/i, // Blocks timers to prevent attacks
        /(\bconsole\b)/i, // Blocks console access

        // Blocks Directory Traversal Attacks
        /\.\.\//i,   // Standard `../`
        /\.\.\/+/i,  // Double traversal `....//`
        /%2e%2e\//i, // Encoded `../`
        /\/etc\/passwd/i // Specific path targeting Linux password file
    ];

    // Check request URL, path, body, and query
    const requestData = req.path + JSON.stringify(req.body) + JSON.stringify(req.query);

    for (const pattern of badPatterns) {
        if (pattern.test(requestData)) {
            console.log(`Blocked request: ${req.method} ${req.path} from ${req.ip}`);
            return res.status(403).send('Forbidden: Suspicious Request Detected');
        }
    }
    next();
};

// Apply WAF globally BEFORE defining routes
app.use(wafMiddleware);

app.get('/', (req, res) => {
    res.send('Web Application Firewall is running');
});

// Handle all undefined routes explicitly
app.use((req, res) => {
    return res.status(404).send('Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
