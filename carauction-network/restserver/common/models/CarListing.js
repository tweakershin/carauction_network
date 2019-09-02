'use strict';

const Composer = require('../lib/composer.js');

module.exports = function(CarListing) {
  Composer.restrictModelMethods(CarListing);
};
