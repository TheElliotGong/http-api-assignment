
//Helper method to return stuff to the client.
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};
const success = (request, response, type) => {
  let message = {message: "This is a successful response."};
  if (type === 'text/xml') {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message></response>`;
    console.log(xmlMessage);
    return respond(request, response, 200, xmlMessage, type );
  } 
  console.log(JSON.stringify(message));
  return respond(request, response, 200, JSON.stringify(message), 'application/json');
}
const notFound = (request, response, type) => {
  let message = {
    message: "The page you were looking for was not found.",
    id: "notFound"
  };
  if (type === 'text/xml') {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, 404, xmlMessage, type );
  } 
  console.log(JSON.stringify(message));
  return respond(request, response, 404, JSON.stringify(message), 'application/json');
};
const unauthorized = (request, response, type, params) => {
  let status = 200;
  let message = {
    message: "You have successfully viewed the content."
  };
  if(!params.loggedIn || params.loggedIn !== 'yes')
  {
    message.message = "Missed loggedIn query parameter set to yes.";
    message.id = "unauthorized";
    status = 401;
  }
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, status, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, status, JSON.stringify(message), "application/json");

};
const badRequest = (request, response, type, params ) =>
{
  let status = 200;
  let message = {
    message: "This request has the required parameters"
  };
  if(!params.valid || params.valid !== 'true')
  {
    message.message = "Missing valid query param set to true.";
    message.id = 'badRequest';
    status = 400;
  }
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, status, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, status, JSON.stringify(message), "application/json");
}
const internal = (request, response, type) => {
  let message = {
    message: "Internal Server Error. Something went wrong.",
    id: "internalError"
  };
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, 500, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, 500, JSON.stringify(message), "application/json");
}
const notImplemented = (request, response, type) =>
{
  let message = {
    message: `A get request for this page has not been implemented yet. 
              Check again later for updated content.`,
    id: "notImplemented"
  }
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, 501, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, 501, JSON.stringify(message), "application/json");
};
const forbidden = (request, response, type) =>
{
  let message = {
    message: 'You do not have access to this content.',
    id: "forbidden"
  }
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, 403, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, 403, JSON.stringify(message), "application/json");
};
/*
const nonQueryResponse = (request, response, type, message, status) => {
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMmessage += `<id>${message.message}</id></response>`;
    console.log(xmlMessage);
    return respond(request, response, status, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, status, JSON.stringify(message), "application/json");
}

const queryResponse = (request, response, type, validMessage, invalidMessage, 
  params, statuses) => {
  let status = statuses.validStatus;
  let message = validMessage;
  if(!params.valid || params.valid !== 'true')
  {
    message = invalidMessage;
    status = statuses.invalidStatus;
  }
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMmessage += `<id>${message.message}</id></response>`;

    console.log(JSON.stringify(xmlMessage));
    return respond(request, response, status, xmlMessage, type);
  } 
  //Default output
  console.log(JSON.stringify(message));
  return respond(request, response, status, JSON.stringify(message),
   "application/json");
};*/
module.exports = { 
  respond, 
  notFound, 
  badRequest,
  success, 
  internal,
  forbidden,
  unauthorized,
  notImplemented};
