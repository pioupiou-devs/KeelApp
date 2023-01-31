const http = require('http');
const manager = require('./modelManager');

const urlBase = '/api';
const urlScoreBoard = urlBase + '/scoreboard';

const server = http.createServer(function (request, response) {
    if (request.url === urlBase) {
        switch (request.method) {
            case 'GET':
                getEndpoints(request, response);
                break;
            case 'POST':
                postEndpoints(request, response);
                break;
            case 'PUT':
                putEndpoints(request, response);
            default:
                response.writeHead(405, { 'Content-Type': 'text/plain' });
                response.end('Method not allowed');
        }
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

function getEndpoints(request, response) {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Home page');
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 error');
    }
}

function postEndpoints(request, response) {
    if (request.url === '/grid/player/player1/frame/1/c1/1') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Login page');
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 error');
    }
}

function putEndpoints(request, response) {
    if (request.url === '/grid') {
        let json = getJsonFromBody(request);
        manager.createGrid(json);

        response.writeHead(301, { 'Location': urlScoreBoard });
        response.end();
    }
}

function getJsonFromBody(request) {
    let body = '';
    let json;

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        try {
            json = JSON.parse(body);
        }
        catch (e) {
            console.error(e);
            response.statusCode = 400;
            return response.end(`error: ${e.message}`);
        }
    });

    return json
}
