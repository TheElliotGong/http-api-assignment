
//Helper method to return stuff to the client.
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const nonQueryResponse = (request, response, type, message, status) => {
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    if(message.id)
    {
      xmlMessage += `<id>${message.id}</id>`;
    }
    xmlMessage += '</response>';
    return respond(request, response, status, xmlMessage, type);
  } 
  return respond(request, response, status, JSON.stringify(message), "application/json");
}

const queryResponse = (request, response, type, validMessage, invalidMessage, 
  params, attribute, paramValue, statuses) => {
  let status = statuses.validStatus;
  let message = validMessage;
  if(!params[attribute] || params[attribute] !== paramValue)
  {
    message = invalidMessage;
    status = statuses.invalidStatus;
  }
  if (type === 'text/xml') 
  {
    let xmlMessage = '<response>';
    xmlMessage += `<message>${message.message}</message>`;
    xmlMessage += `<id>${message.id}</id></response>`;

    return respond(request, response, status, xmlMessage, type);
  } 
  //Default output
  return respond(request, response, status, JSON.stringify(message),
   "application/json");
};
module.exports = { 
  respond,  
  nonQueryResponse,
  queryResponse};
