'use strict';

const Validator = require('../validator');

describe('simple numeric validation', () => {
  describe('#isNegative', () => {
    test('regular cases', () => {
      expect(Validator.isNegative(-1)).toEqual(true);
      expect(Validator.isNegative(0)).toEqual(false);
    });
  });
});

describe('validator module performs basic validation of', () => {
  let str = 'yes';
  let num = 1;
  let arr = ['a'];
  let obj = {x:'y'};
  let bool = false;
  let func = () => {};

  test('strings', () => {
    expect(Validator.isString(str)).toBeTruthy();
    expect(Validator.isString(num)).toBeFalsy();
    expect(Validator.isString(arr)).toBeFalsy();
    expect(Validator.isString(obj)).toBeFalsy();
    expect(Validator.isString(bool)).toBeFalsy();
    expect(Validator.isString(func)).toBeFalsy();
  });

  test('numbers', () => {
    expect(Validator.isNumber(str)).toBeFalsy();
    expect(Validator.isNumber(num)).toBeTruthy();
    expect(Validator.isNumber(arr)).toBeFalsy();
    expect(Validator.isNumber(obj)).toBeFalsy();
    expect(Validator.isNumber(bool)).toBeFalsy();
    expect(Validator.isNumber(func)).toBeFalsy();
  });

  test('arrays', () => {
    expect(Validator.isArray(str)).toBeFalsy();
    expect(Validator.isArray(num)).toBeFalsy();
    expect(Validator.isArray(arr)).toBeTruthy();
    expect(Validator.isArray(obj)).toBeFalsy();
    expect(Validator.isArray(bool)).toBeFalsy();
    expect(Validator.isArray(func)).toBeFalsy();
  });

  test('objects', () => {
    expect(Validator.isObject(str)).toBeFalsy();
    expect(Validator.isObject(num)).toBeFalsy();
    expect(Validator.isObject(arr)).toBeFalsy();
    expect(Validator.isObject(obj)).toBeTruthy();
    expect(Validator.isObject(bool)).toBeFalsy();
    expect(Validator.isObject(func)).toBeFalsy();
  });

  test('booleans', () => {
    expect(Validator.isBoolean(str)).toBeFalsy();
    expect(Validator.isBoolean(num)).toBeFalsy();
    expect(Validator.isBoolean(arr)).toBeFalsy();
    expect(Validator.isBoolean(obj)).toBeFalsy();
    expect(Validator.isBoolean(bool)).toBeTruthy();
    expect(Validator.isBoolean(func)).toBeFalsy();
  });

  test('functions', () => {
    expect(Validator.isFunction(str)).toBeFalsy();
    expect(Validator.isFunction(num)).toBeFalsy();
    expect(Validator.isFunction(arr)).toBeFalsy();
    expect(Validator.isFunction(obj)).toBeFalsy();
    expect(Validator.isFunction(bool)).toBeFalsy();
    expect(Validator.isFunction(func)).toBeTruthy();
  });

  test('truthy', () => {
    expect(Validator.isTruthy(0)).toEqual(false);
    expect(Validator.isTruthy(1)).toEqual(true);
  })
});

describe('#isNumberValid', () => {
  let one = 1;
  let negOne = -1;
  let zero = 0;

  test('rule: positive', () => {
    expect(Validator.isNumberValid(one, 'positive')).toEqual(true);
    expect(Validator.isNumberValid(negOne, 'positive')).toEqual(false);
    expect(Validator.isNumberValid(zero, 'positive')).toEqual(false);
  });

  test('rule: negative', () => {
    expect(Validator.isNumberValid(one, 'negative')).toEqual(false);
    expect(Validator.isNumberValid(negOne, 'negative')).toEqual(true);
    expect(Validator.isNumberValid(zero, 'negative')).toEqual(false);
  });

  test('rule: zero', () => {
    expect(Validator.isNumberValid(one, 'zero')).toEqual(false);
    expect(Validator.isNumberValid(negOne, 'zero')).toEqual(false);
    expect(Validator.isNumberValid(zero, 'zero')).toEqual(true);
  });

  test('non-number input', () => {
    expect(Validator.isNumberValid('not a number', 'rule irrelevant')).toEqual(false);
  });

  test('unexpected rule', () => {
    expect(Validator.isNumberValid(zero, 'unknown rule')).toEqual(false);
  })
});

// Jumping off the code review example...
describe('#isObjectValid', () => {
  const schema = {
    fields: {
      id: {type: 'string'},
      age: {type: 'number'},
      favoriteToys: {type: 'object'}
    }
  };
  const schemaMissingProp = {
    missingProperty: 0,
    wrongName: {
      id: {type: 'string'},
      age: {type: 'number'},
      favoriteToys: {type: 'object'}
    }
  };
  const dummyArray = [];

  const v = new Validator(schema);
  const vSchemaMissingProp = new Validator(schemaMissingProp);
  const vSchemaArray = new Validator(dummyArray);

  test('expected case', () => {
    expect(v.isValid({id: 'kali', age: 2, favoriteToys: {}})).toEqual(true);
  });

  test('incorrect parameter types', () => {
    expect(v.isValid([])).toEqual(false);
    expect(vSchemaArray.isValid({id: 'kali', age: 2, favoriteToys: []})).toEqual(false);
  });

  test('missing field property in schema', () => {
    expect(vSchemaMissingProp.isValid({id: 'kali', age: 2, favoriteToys: {}})).toEqual(false);
  });

  test('missing fields', () => {
    expect(v.isValid({age: 2, favoriteToys: {}})).toEqual(false);
    expect(v.isValid({id: 'kali', favoriteToys: {}})).toEqual(false);
    expect(v.isValid({id: 'kali', age: 2})).toEqual(false);
  });

  test('incorrect field types', () => {
    expect(v.isValid({id: 1, age: 2, favoriteToys: {}})).toEqual(false);
    expect(v.isValid({id: 'kali', age: '2', favoriteToys: {}})).toEqual(false);
    expect(v.isValid({id: 'kali', age: 2, favoriteToys: []})).toEqual(false);
  });
});
