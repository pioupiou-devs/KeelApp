const http = require('http');
const urlParser = require('url');
const manager = require('./modelManager');

const urlBase = '/api';
const urlGrid = urlBase + '/grid';
const urlPlayer = urlGrid + '/player';
const urlFrame = urlPlayer + '/frame';

const urlRedirectGrid = 'index.html';
const frontServerPort = 5500;

// Create the server with the callback function to handle every HTTP request
const server = http.createServer(function (request, response) {
    if (getRegexUrl(urlBase).test(request.url)) {
        switch (request.method) {
            case 'GET':
                console.log('GET: ' + request.url);
                getEndpoints(request, response);
                break;
            case 'POST':
                console.log('POST: ' + request.url);
                postEndpoints(request, response);
                break;
            case 'PUT':
                console.log('PUT: ' + request.url);
                putEndpoints(request, response);
                break;
            default:
                responseError(response, 405, 'Method Not Allowed');
        }
    }
    else {
        responseError(response);
    }
});

// Start the server
server.listen(3000);

//#region Endpoints

/* GET: /api/grid 
@param {object} request object representing the input HTTP request
@param {object} response object representing the HTTP response tha will be sent
*/
function getEndpoints(request,response)
{
    if(getRegexUrl(urlGrid).test(request.url))
    {
        console.log('grid get');
        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.write(JSON.stringify(manager.getGrid()));
        response.end();
        console.log('grid get end');
    }
}


/* POST: /api/grid/player/frame
@param {object} request object representing the input HTTP request
@param {object} response object representing the HTTP response tha will be sent
*/
function postEndpoints(request, response) {
    if (getRegexUrl(urlGrid).test(request.url)) {
        if (getRegexUrl(urlFrame).test(request.url)) {
            {
                console.log('frame update');
                const querystring = getQueryParams(request.url);
                const frame = getPathInfoParam(request.url);
                const player = querystring.p;
                const element = querystring.e;
                const value = querystring.v;
                console.log('frame: ' + frame + ', player: ' + player + ', element: ' + element + ', value: ' + value);
                manager.updateGrid(player, frame, element, value);

                response.writeHead(200, { 'Content-Type': 'text/json' });
                response.write(JSON.stringify(manager.getGrid()));
                response.end();
            }
        }
    }
}


/* PUT: /api/grid
@param {object} request object representing the input HTTP request
@param {object} response object representing the HTTP response tha will be sent
*/
function putEndpoints(request, response) {
    if (getRegexUrl(urlGrid).test(request.url)) {
        console.log('grid creation');

        let json = getJsonFromBody(request);
        manager.createGrid(json);

        let urlRedirect =   'http://localhost:' + frontServerPort + '/src/client/' + urlRedirectGrid;

        response.writeHead(308, { 'Location': urlRedirect });
        response.end();
    }
}

//#endregion Endpoints

//#region Utils

/* Get the json from the body of the request
@param {object} request object representing the input HTTP request
*/
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

/* Get the querystring of the url
@param {string} url of the request
*/
function getQueryParams(url) {
    const parsedUrl = urlParser.parse(url, true);
    return parsedUrl.query;
}

/* Get the last param of the url
@param {string} url of the request
*/
function getPathInfoParam(url) {
    const parsedUrl = urlParser.parse(url, true);
    return parsedUrl.pathname.split('/').filter(Boolean).pop();
}

/* Get the regex of the url
@param {string} url of the request
*/
function getRegexUrl(url) {
    url = url.replace('/', '\/');
    return new RegExp('.*' + url + '.*');
}

/* Send an error response
@param {object} response object representing the HTTP response tha will be sent
@param {number} statusCode of the response
@param {string} message of the response
*/
function responseError(response, statusCode = 500, message = 'Internal Server Error') {
    response.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    response.end(message);
}
//#endregion Utils