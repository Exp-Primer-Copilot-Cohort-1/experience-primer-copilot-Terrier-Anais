// Create web server
// 1. Load the http and fs modules
// 2. Create a server
// 3. Read the comments.json file
// 4. When the server receives a request, read the comments.json file
// 5. When the server receives a request, write the comments.json file
// 6. Start the server

const http = require('http');
const fs = require('fs');

// Create a server
const server = http.createServer((req, res) => {
  // Read the comments.json file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }

    if (req.url === '/comments') {
      // When the server receives a request, read the comments.json file
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } else if (req.url === '/comments/new') {
      // When the server receives a request, write the comments.json file
      // Parse the comments.json file
      const comments = JSON.parse(data);
      // Add a new comment
      comments.push({ body: '...', created: new Date() });
      // Write the comments.json file
      fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        // Send the new comments.json file
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});

// Run the server: node comments.js
// Test the server:
// 1. Open http://localhost:3000/comments in the browser
// 2. Open http://localhost:3000/comments/new in the browser
// 3. Open http
