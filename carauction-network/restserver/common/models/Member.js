'use strict';

const Composer = require('../lib/composer.js');

module.exports = function(Member) {
  Composer.restrictModelMethods(Member);
};
