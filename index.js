'use strict';

/**
 * Sets the version in the config.xml of the cordova project.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  20 May 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Config = require('cordova-config');

// export the module
module.exports = function(version, versionCodes) {
    // Make it a default object if it is not provided
    versionCodes = versionCodes || {};

    return through.obj(function(file, enc, cb) {
        try {
            // Load the config.xml file
            var config = new Config(path.join(file.path, 'config.xml'));

			// Sets the version
            config.setVersion(version);
            
            if(versionCodes.androidVersionCode) {
                // Set the android version code if provided
                config.setAndroidVersionCode(versionCodes.androidVersionCode);
            }
            
            if(versionCodes.iosBundleVersion) {
                // Set the android version code if provided
                config.setIOSBundleVersion(versionCodes.iosBundleVersion);
            }

            // Write the config file
            var self = this;
            config.write()
            .then(function() {
                // Pipe the file to the next step
                self.push(file);
                cb();
            });
        }
        catch(err) {
			// Oh no, something happened!
            cb(new gutil.PluginError('gulp-cordova-version', err.message));
        }
    });
};
