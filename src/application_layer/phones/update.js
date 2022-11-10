const joi = require('joi');

const dataAccessLayer = require('../../../src/data_access_layer');

const PATH_SCHEMA = joi.object().keys({
  'id': joi.string().required(),
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
    return pathValidationError.details;
  }

  const {
    'value': validatedBody,
    'error': bodyValidationError,
  } = REQUEST_SCHEMA.validate(request.body);

  if (bodyValidationError) {
    return bodyValidationError.details;
  }

  return {
    'id': validatedPathParameters.id,
    ...validatedBody,
  };
}

module.exports = {
  parseInputParameters
};
