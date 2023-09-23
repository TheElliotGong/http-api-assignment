/*
Author: Elliot Gong
Purpose: Handle server actions for various requests
Date: 9/23/2023
*/

//Include other scripts and modules
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');
//Fields for responses that don't use query parameters.
const successMessage = {message: 'This is a successful response.'};
const notFoundMessage = {message: 'The page you were looking for was not found.',
id: 'notFound'};
const forbiddenMessage = { message: 'You do not have access to this content.',
id: 'forbidden'};
const internalMessage = {message: 'Internal Server Error. Something went wrong.',
id: 'internalError'};
const notImplementedMessage = {message: `A get request for this page has not been implemented yet. 
Check again later for updated content.`,
id: 'notImplemented'};
//Fields for requests that use query parameters.
const badRequestValidMessage = {message: "This request has the required parameters."};
const badRequestInvalidMessage = {message:"Missing valid query param set to true.",
id: 'badRequest'};
const badRequestStatuses = {validStatus: 200, invalidStatus: 400};
const unauthorizedValidMessage = {message: "You have successfully viewed the content."};
const unauthorizedInvalidMessage = {message: "Missed loggedIn query parameter set to yes.",
id: 'unauthorized'};
const unauthorizedStatuses = {validStatus: 200, invalidStatus: 401};

const port = process.env.PORT || process.env.NODE_PORT || 3000;
//This function handles requests to the server from both the url and the html page.
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedType = request.headers.accept;
  //Handle various types of requests 
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      responseHandler.nonQueryResponse(request, response, acceptedType, successMessage, 200)
      break;
    case '/badRequest':
      responseHandler.queryResponse(request, response, acceptedType, badRequestValidMessage, 
        badRequestInvalidMessage, params, 'valid', 'true', badRequestStatuses);
      break;
    case '/badRequest?valid=true':
      responseHandler.queryResponse(request, response, acceptedType, badRequestValidMessage, 
        badRequestInvalidMessage, params, 'valid', 'true', badRequestStatuses);
      break;
    case '/unauthorized':
      responseHandler.queryResponse(request, response, acceptedType, unauthorizedValidMessage, 
        unauthorizedInvalidMessage, params, 'loggedIn', 'yes', unauthorizedStatuses);
      break;
    case '/unauthorized?loggedIn=yes':
      responseHandler.queryResponse(request, response, acceptedType, unauthorizedValidMessage, 
        unauthorizedInvalidMessage, params, 'loggedIn', 'yes', unauthorizedStatuses);
      break;
    case '/notImplemented':
      responseHandler.nonQueryResponse(request, response, acceptedType, notImplementedMessage, 501);
      break;
    case '/forbidden':
      responseHandler.nonQueryResponse(request, response, acceptedType, forbiddenMessage, 403);
      break;
    case '/notFound':
      responseHandler.nonQueryResponse(request, response, acceptedType, notFoundMessage, 404);
      break;
    case '/internal':
      responseHandler.nonQueryResponse(request, response, acceptedType, internalMessage, 500);;
      break;
    default:
      responseHandler.nonQueryResponse(request, response, acceptedType, notFoundMessage, 404);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
