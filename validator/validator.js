'use strict';

class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  isString(input) {
    return typeof input === 'string';
  }

  isObject(input) { }

  isArray(input, valueType) { }

  isBoolean(input) {}

  isNumber(input) {}

  isFunction(input) {}

  isTruthy(input) {}

  // Vinicio - checks an object against a schema
  // isValid(data, schema)
  // isValidObject in my demo code
  isValid(data) {
  }
}

module.exports = Validator;
