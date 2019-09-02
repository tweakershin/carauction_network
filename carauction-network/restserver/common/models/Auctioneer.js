'use strict';

const Composer = require('../lib/composer.js');

module.exports = function(Auctioneer) {
  Composer.restrictModelMethods(Auctioneer);
};
