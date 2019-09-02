'use strict';

const Composer = require('../lib/composer.js');

module.exports = function(CloseBidding) {
  Composer.restrictModelMethods(CloseBidding);
};
