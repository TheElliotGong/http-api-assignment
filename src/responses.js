/*
Author: Elliot Gong
Purpose: Handle server responses that will return data in either xml or json
Date: 9/23/2023
*/
// Helper method to return stuff to the client.
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};
/**
 * This function handles server requests that don't use query parameters.
 * @param {*} request
 * @param {*} response
 * @param {*} type = the format that the returned data follows.
 * @param {*} message = the message that is going to be returned data includes.
 * @param {*} status = the HTTP status of the response.
 * @returns
 */
const nonQueryResponse = (request, response, type, message, status) => {
  // Check if data needs to be formatted in xml
  if (type === 'text/xml') {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    // Include message id if possible
    if (message.id) {
      xmlMessage += `<id>${message.id}</id>`;
    }
    xmlMessage += '</response>';
    console.log(xmlMessage);
    return respond(request, response, status, xmlMessage, type);
  }
  // Return data in json format by default
  console.log(message);
  return respond(request, response, status, JSON.stringify(message), 'application/json');
};
/**
 * This function handles server requests that use query parameters.
 * @param {*} request
 * @param {*} response
 * @param {*} type = the format that the returned data follows.
 * @param {*} validMessage = the message to be returned when a query parameter is included.
 * @param {*} invalidMessage = the message to be returned when a query parameter is missing.
 * @param {*} params = the list of parameters in a url
 * @param {*} attribute = the specific url parameter/attribute to check for
 * @param {*} paramValue = the value the url parameter/attribute should be checked again.
 * @param {*} statuses = the list of statuses depending on the presence of query parameters
 * in the url.
 * @returns
 */
const queryResponse = (
  request,
  response,
  type,
  validMessage,
  invalidMessage,
  params,
  attribute,
  paramValue,
  statuses,
) => {
  let status = statuses.validStatus;
  let message = validMessage;
  // Check if query parameter is present.
  if (!params[attribute] || params[attribute] !== paramValue) {
    message = invalidMessage;
    status = statuses.invalidStatus;
  }
  // Check if data needs to be formatted in xml
  if (type === 'text/xml') {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, status, xmlMessage, type);
  }
  // Return data in json format by default.
  console.log(message);
  return respond(
    request,
    response,
    status,
    JSON.stringify(message),
    'application/json',
  );
};
module.exports = {
  respond,
  nonQueryResponse,
  queryResponse,
};
