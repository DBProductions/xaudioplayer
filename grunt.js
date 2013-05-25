module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'xaudioplayer.js']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                node: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true              
            }
        },
        min: {
            xaudioplayer: {
                src: ['xaudioplayer.js'],
                dest: 'xaudioplayer.min.js'
            }
        },
        uglify: {
            mangle: {toplevel: false}, //prevent changes to variable and function names
            squeeze: {dead_code: false},
            codegen: {quote_keys: true}
        }
    });
    
    grunt.registerTask('default', 'lint min');
};
