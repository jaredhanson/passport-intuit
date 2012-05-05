var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IntuitStrategy = require('passport-intuit/strategy');


vows.describe('IntuitStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new IntuitStrategy({ returnURL: 'https://www.example.com/auth/intuit/return' },
        function() {}
      );
    },
    
    'should be named paypal': function (strategy) {
      assert.equal(strategy.name, 'intuit');
    },
    'should have correct provider URL': function (strategy) {
      assert.equal(strategy._providerURL, 'https://openid.intuit.com/openid/xrds');
    },
  },
  
}).export(module);
