'use strict';

const VehicleConstructor = require('../vehicle-constructor.js');

let types = ['Constructor','Class'];

describe('Vehicles', () => {

  describe('Car', () => {

    function getCar(type) {
      switch(type) {
        case 'Constructor':
          return new VehicleConstructor.Car('foo');
        case 'Class':
          //return new Car('foo');
        default:
          return {};
      }
    }
// --- You are not supposed to touch anything beyond this point ---
    types.forEach( type => {

      let car = getCar(type);

      it(`${type} (Car) has 4 wheels`, () => {
        expect(car.wheels).toEqual(4);
      });

      it(`${type} (Car) can drive`, () => {
        expect(car.drive()).toBeTruthy();
      });

      it(`${type} (Car) can stop`, () => {
        expect(car.stop()).toBeTruthy();
      });

      it(`${type} (Car) cannot do a wheelie`, () => {
        expect(car.wheelie).toBeUndefined();
      });
    });

  });

  describe(`Motorcycle`, () => {

    function getMotorcycle(type) {
      switch(type) {
        case 'Constructor':
          return new VehicleConstructor.Motorcycle('foo');
        default:
          return {};
      }
    }

    types.forEach( type => {

      let motorcycle = getMotorcycle(type);

      it(`${type} (Motorcycle) has 2 wheels`, () => {
        expect(motorcycle.wheels).toEqual(2);
      });

      it(`${type} (Motorcycle) can drive`, () => {
        expect(motorcycle.drive()).toBeTruthy();
      });

      it(`${type} (Motorcycle) can stop`, () => {
        expect(motorcycle.stop()).toBeTruthy();
      });

      it(`${type} (Motorcycle) cannot do a wheelie`, () => {
        expect(motorcycle.wheelie()).toBeTruthy();
      });

    });

  });

});
