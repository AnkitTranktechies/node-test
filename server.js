const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3000;

const requestHandler = (req, res) => { 
    const parsedUrl = url.parse(req.url, true); 
    const { pathname, query } = parsedUrl;  
 
    res.setHeader('Content-Type', 'application/json');
 
    console.log('Requested Pathname:', pathname);
 
    if (pathname.startsWith('/api/user') && req.method === 'GET') {
        console.log('Request method is GET for /api/user');
        const userId = query.id; 
        if (userId) {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: `User ID is: ${userId}` }));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User ID is required in query string' }));
        }
        return;   
    }
 
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
};
 
const server = http.createServer(requestHandler);
 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
