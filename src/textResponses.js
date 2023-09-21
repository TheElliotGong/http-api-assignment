const success = '{"message":"This is a successful response"}';
const defaultMessage = '{"message":"The page you were looking for was not found.","id":"notFound"}';
const badRequest = '{"message":"Missing valid query parameter set to true","id":"badRequest"}';
const badRequest2 = '{"message":"This request has the required parameters."}';

const returnMessage = (request, response, message) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(message);
  response.end();
};

module.exports = {
  returnMessage,
  success,
  defaultMessage,
  badRequest,
  badRequest2,
};
