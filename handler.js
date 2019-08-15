'use strict';

const dataService = require('./dbService');
const uuidv1 = require('uuid/v1');

function createResponse(message, statusCode = 200) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

async function procesarNombre(nombre) {
  let item = {
    id: uuidv1(),
    nombre: nombre
  };

  let response = await dataService.saveItem(item);

  return createResponse(response);
}

module.exports.hello = async event => {


  let parameters = event.pathParameters;

  let nombre = parameters.nombre;


  return await procesarNombre(nombre);

};


module.exports.helloqp = async event => {


  let queryStringParameters=event.queryStringParameters;

  if( !(queryStringParameters && queryStringParameters.nombre)){
    return createResponse("no esta el nombre");
  }

  let nombre = queryStringParameters.nombre;

  return await procesarNombre(nombre);

};

module.exports.index = async event => {

  let response = await dataService.getPagina(1);

  return createResponse(response);
};
