'use strict';

class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  static isNegative(input) { return input < 0; }

  static isString(input) { return typeof input === 'string'; }

  static isNumber(input) { return typeof input === 'number'; }

  static isArray(input) { return Array.isArray(input); }

  static isObject(input) { return typeof input === 'object' && !Array.isArray(input); }

  static isBoolean(input) { return typeof input === 'boolean'; }

  static isFunction(input) { return typeof input === 'function'; }

  static isTruthy(input) { return Boolean(input) }

  static isNumberValid(number, rule) {
    if (!Validator.isNumber(number)) {
      return false;
    }

    if(rule === 'positive') {
      return number > 0;
    }

    if(rule === 'negative') {
      return number < 0;
    }

    if(rule === 'zero') {
      return number === 0;
    }

    // Unknown rule
    return false;
  }

  isValid(data) {
    // input and schema must be objects
    if (!Validator.isObject(data) || !Validator.isObject(this.schema)) {
      return false;
    }
    // Test for valid schema
    if (!this.schema.hasOwnProperty('fields')) {
      return false;
    }

    // Test data for valid fields
    for (let field of Object.keys(this.schema.fields)) {
      if (!data.hasOwnProperty(field)) {
        return false;
      }

      const expectedType = this.schema.fields[field].type;
      const fieldType = Validator.isArray(data[field]) ? 'array' : typeof data[field];
      if (fieldType !== expectedType) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Validator;
