'use strict';

const Composer = require('../lib/composer.js');

module.exports = function(Offer) {
  Composer.restrictModelMethods(Offer);
};
