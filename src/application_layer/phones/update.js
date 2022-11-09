const joi = require('joi');

const dataAccessLayer = require('../../../src/data_access_layer/phones');

const PATH_SCHEMA = joi.object().keys({
  'phoneId': joi.string().required(),
}).required();

const REQUEST_SCHEMA = joi.object().keys({
  'make':            joi.string().required(),
  'model':           joi.string().required(),
  'storage':         joi.number().required(),
  'monthly_premium': joi.number().precision(2).required(),
  'excess':          joi.number().required(),
});

function parseInputParameters(request) {
  const {
    'value': validatedPathParameters,
    'error': pathValidationError,
  } = PATH_SCHEMA.validate(request.params);

  if (pathValidationError) {
    throw new Error(pathValidationError);
  }

  const {
    'value': validatedBody,
    'error': bodyValidationError,
  } = REQUEST_SCHEMA.validate(request.body);

  if (bodyValidationError) {
    throw new Error(bodyValidationError);
  }

  return {
    'id': validatedPathParameters.phoneId,
    ...validatedBody,
  };
}


async function handleRequest(request) {
  const phoneToUpdate = parseInputParameters(request);

  const updatedPhone = await dataAccessLayer.updatePhone(phoneToUpdate);

  return phoneToUpdate;
}

module.exports = {
  handleRequest,
};
