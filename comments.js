// Create web server application
// For use with Node.js
// Run with: node comments.js

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var url_parts = url.parse(request.url);
    var path = url_parts.pathname;
    var query = url_parts.query;

    switch (path) {
        case '/':
            fs.readFile('comments.html', function(error, data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
            break;
        case '/comments':
            if (request.method == 'POST') {
                var body = '';

                request.on('data', function(data) {
                    body += data;
                });

                request.on('end', function() {
                    var post = qs.parse(body);
                    var comment = post['comment'];
                    fs.appendFile('comments.txt', comment + '\n', function(error) {
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write('<html><head><title>Comment Posted</title></head><body><h1>Comment Posted</h1></body></html>');
                        response.end();
                    });
                });
            } else {
                fs.readFile('comments.txt', function(error, data) {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.write(data);
                    response.end();
                });
            }
            break;
        default:
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('404 - Page not found.');
    }
});

// Listen on port 8000, IP defaults to
