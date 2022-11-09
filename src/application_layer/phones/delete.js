const joi = require('joi');

const dataAccessLayer = require('../../../src/data_access_layer/phones')

const PATH_SCHEMA = joi.object().keys({
  'phoneId': joi.string().required(),
}).required();

function parseInputParameters(request) {
    console.log(request)
  const {
    'value': validatedPathParameters,
    'error': pathValidationError,
  } = PATH_SCHEMA.validate(request.params);

  if (pathValidationError) {
    throw new Error(pathValidationError);
  }

  return {
    ...validatedPathParameters,
  };
}


async function handleRequest(request) {
    console.log(1)
  const { phoneId } = parseInputParameters(request);
    console.log(2)

  const foundPhone = await dataAccessLayer.deletePhoneById(phoneId);
    console.log(3)

  return phoneId;
}

module.exports = {
    handleRequest
};
