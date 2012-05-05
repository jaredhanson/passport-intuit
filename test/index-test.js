var vows = require('vows');
var assert = require('assert');
var util = require('util');
var intuit = require('passport-intuit');


vows.describe('passport-intuit').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(intuit.version);
    },
  },
  
}).export(module);
