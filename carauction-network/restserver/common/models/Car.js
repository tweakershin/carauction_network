'use strict';

const Composer = require('../lib/composer.js');

module.exports = function(Car) {
  Composer.restrictModelMethods(Car);
};
