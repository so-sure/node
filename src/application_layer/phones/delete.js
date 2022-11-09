const joi = require('joi');

const dataAccessLayer = require('../../../src/data_access_layer/phones')

const PATH_SCHEMA = joi.object().keys({
  'phoneId': joi.string().required(),
}).required();

function parseInputParameters(request) {
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
  const { phoneId } = parseInputParameters(request);

  const foundPhone = await dataAccessLayer.deletePhoneById(phoneId);

  return phoneId;
}

module.exports = {
    handleRequest
};
