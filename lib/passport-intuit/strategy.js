/**
 * Module dependencies.
 */
var util = require('util')
  , openid = require('passport-openid')
  , OpenIDStrategy = require('passport-openid').Strategy;


/**
 * `Strategy` constructor.
 *
 * The Intuit authentication strategy authenticates requests by delegating to
 * Intuit using the OpenID 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `identifier`,
 * and optionally a service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `returnURL`  URL to which Intuit will redirect the user after authentication
 *   - `realm`      the part of URL-space for which an OpenID authentication request is valid
 *   - `profile`    enable profile exchange, defaults to _true_
 *
 * Examples:
 *
 *     passport.use(new IntuitStrategy({
 *         returnURL: 'http://localhost:3000/auth/intuit/return',
 *         realm: 'http://localhost:3000/'
 *       },
 *       function(identifier, profile, done) {
 *         User.findByOpenID(identifier, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, validate) {
  options = options || {};
  options.providerURL = options.providerURL || 'https://openid.intuit.com/openid/xrds';
  options.profile =  (options.profile === undefined) ? true : options.profile;

  OpenIDStrategy.call(this, options, validate);
  this.name = 'intuit';
}

/**
 * Inherit from `OpenIDStrategy`.
 */
util.inherits(Strategy, OpenIDStrategy);


/**
 * Assist OpenID discovery.
 *
 * Intuit OpenID identifiers take the following form:
 *
 *     https://openid.intuit.com/Identity-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 *
 * By default, when requested without an `Accept` header, requests to these URLs
 * return 500 errors with HTML pages that (obviously) lack the necessary OpenID
 * link tags.
 *
 * When requested with the `Accept` header set to `application/xrds+xml`, the
 * response contains the correct XRDS document.  However, the underlying openid
 * module does not set this header.
 *
 * As a consequence of this, discovery fails for OpenID identifiers issued by
 * Intuit.  But, because we know the form these identifers take, as well as the
 * provider endpoint, we can provide assistance and rescue the situation.
 */
openid.discover(function(identifier, done) {
  if (identifier.indexOf('https://openid.intuit.com/Identity-') == 0) {
    var provider = {};
    provider.version = 'http://specs.openid.net/auth/2.0';
    provider.endpoint = 'https://openid.intuit.com/OpenId/Provider';
    return done(null, provider);
  }
  
  return done(null, null);
})


/**
 * Expose `Strategy`.
 */ 
module.exports = Strategy;
