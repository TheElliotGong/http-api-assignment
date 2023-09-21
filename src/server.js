const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const textHandler = require('./textResponses.js');
const responseHandler = require('./responses.js');
// const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const urlStruct = {
  
//     '/': htmlHandler.getIndex,
//     '/style.css': htmlHandler.getCSS,
//     '/unauthorized': htmlHandler.respondHTML,
//     '/badRequest': 'sa',
//     '/badRequest?valid=true': 'adaf',
//       notFound: responseHandler.notFound,
   
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedType = request.headers.accept.split(',');
  // if(!urlStruct[request.method])
  // {
  //     return urlStruct.HEAD.notFound(request, response);
  // }
  // if(urlStruct[request.method][parsedUrl.pathname])
  // {
  //     return urlStruct[request.method][parsedUrl.pathname](request, response);
  // }
  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      responseHandler.success(request, response, acceptedType);
      break;
    case '/badRequest':
      responseHandler.badRequest(request, response, acceptedType, params)
      break;
    case '/badRequest?valid=true':
      responseHandler.badRequest(request, response, acceptedType, params);
      break;
    case '/unauthorized':
      responseHandler.unauthorized(request, response, acceptedType, params);
      break;
    case '/unauthorized?loggedIn=yes':
      responseHandler.unauthorized(request, response, acceptedType, params);
      break;
    case '/notImplemented':
      responseHandler.notImplemented(request, response, acceptedType);
      break;
    case '/forbidden':
      responseHandler.forbidden(request, response, acceptedType);
      break;
    case '/notFound':
      responseHandler.notFound(request, response, acceptedType);
      break;
    case '/internal':
      responseHandler.internal(request, response, acceptedType);
      break;
    default:
      responseHandler.notFound(request, response, acceptedType);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
