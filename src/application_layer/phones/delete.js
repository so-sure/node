const joi = require('joi');

const PATH_SCHEMA = joi.object().keys({
  'id': joi.string().required(),
}).required();

function parseInputParameters(request) {
  const {
    'value': validatedPathParameters,
    'error': pathValidationError,
  } = PATH_SCHEMA.validate(request.params);

  if (pathValidationError) {
    return pathValidationError.details;
  }

  return {
    ...validatedPathParameters,
  };
}

module.exports = {
  parseInputParameters,
};
