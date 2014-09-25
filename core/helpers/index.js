/**
 * Created by liuxing on 14-9-24.
 */
var hbs             = require('hbs'),
    _               = require('lodash'),
    crypto          = require('crypto'),
    coreHelpers = {},
    registerHelpers,
    assetTemplate   = _.template('<%= source %>?v=<%= version %>'),
    linkTemplate    = _.template('<a href="<%= url %>"><%= text %></a>'),
    scriptTemplate  = _.template('<script src="<%= source %>?v=<%= version %>"></script>'),
    isProduction    = process.env.NODE_ENV === 'production';

var assetHash = (crypto.createHash('md5').update('1.0' + Date.now()).digest('hex')).substring(0, 10);

coreHelpers.getTitle = function(){
    var title =  "RSS reader";
    return new hbs.handlebars.SafeString(title);

};

// ### Asset helper
//
// *Usage example:*
// `{{asset "css/screen.css"}}`
// `{{asset "css/screen.css" ghost="true"}}`
// Returns the path to the specified asset. The ghost
// flag outputs the asset path for the Ghost admin
coreHelpers.asset = function (context, options) {
    var output = '',
        isAdmin = options && options.hash && options.hash.ghost;

    output += config.paths.subdir + '/';

    if (!context.match(/^favicon\.ico$/) && !context.match(/^shared/) && !context.match(/^asset/)) {
        if (isAdmin) {
            output += 'ghost/';
        } else {
            output += 'assets/';
        }
    }

    // Get rid of any leading slash on the context
    context = context.replace(/^\//, '');
    output += context;

    if (!context.match(/^favicon\.ico$/)) {
        output = assetTemplate({
            source: output,
            version: coreHelpers.assetHash
        });
    }

    return new hbs.handlebars.SafeString(output);
};

// Register an async handlebars helper for a given handlebars instance
function registerAsyncHelper(hbs, name, fn) {
    hbs.registerAsyncHelper(name, function (options, cb) {
        // Wrap the function passed in with a when.resolve so it can
        // return either a promise or a value
        when.resolve(fn.call(this, options)).then(function (result) {
            cb(result);
        }).otherwise(function (err) {
            errors.logAndThrowError(err, 'registerAsyncThemeHelper: ' + name);
        });
    });
}
// Register a handlebars helper for themes
function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
}

// Register an async handlebars helper for themes
function registerAsyncThemeHelper(name, fn) {
    registerAsyncHelper(hbs, name, fn);
}

// Register a handlebars helper for admin
function registerAdminHelper(name, fn) {
    coreHelpers.adminHbs.registerHelper(name, fn);
}


registerHelpers = function (adminHbs) {

    // Expose hbs instance for admin
    coreHelpers.adminHbs = hbs;
    //hbs = adminHbs;
    // Store hash for assets
    coreHelpers.assetHash = assetHash;
    registerThemeHelper('asset', coreHelpers.asset);

    registerAdminHelper('asset', coreHelpers.asset);
    registerAdminHelper('getTitle', coreHelpers.getTitle);


};
module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;
module.exports.registerThemeHelper = registerThemeHelper;
module.exports.registerAsyncThemeHelper = registerAsyncThemeHelper;
