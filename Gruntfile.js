module.exports = function (grunt) {
    'use strict';
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        temp: 'temp',
        distrib: 'distrib'
    };

    var packageJSON = grunt.file.readJSON('./package.json');

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: packageJSON,

        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*', '<%= yeoman.temp %>/*'],
            server: '.tmp'
        },

        // linting
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,*/}*.js',
                '!<%= yeoman.app %>/js/bower/*',
                '!<%= yeoman.app %>/js/bootstrap/*',
                '!<%= yeoman.app %>/js/bootstrap.js',
                '!<%= yeoman.app %>/js/libs/*'
//				'spec/{,*/}*.js'
            ]
        },

        // require
        requirejs: {
            dist: {
                options: {
                    optimize: 'none',
                    baseUrl: '<%= yeoman.app %>/js/',
                    name: 'init',
                    mainConfigFile: '<%= yeoman.app %>/js/init.js',
                    out: '.tmp/concat/js/main.js'
                }
            }
        },

        rev: {
            files: {
                src: [
                    '<%= yeoman.dist %>/js/*.js',
                    '<%= yeoman.dist %>/css/*.css'
                ]
            }
        },

        useminPrepare: {
            options: {
                root: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },

        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/index.html'],
            css: ['<%= yeoman.dist %>/css/main.css']
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{gif,png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        /*
         cssmin: {
         dist: {
         files: {
         '<%= yeoman.dist %>/css/main.css': [
         //						'.tmp/styles/{,*\/}*.css',
         '<%= yeoman.app %>/css/{,*\/}*.css',
         'js/bower/bootstrap-toggle/css/bootstrap-toggle.css'
         ]
         }
         }
         },
         */

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'js/bower/bootstrap-sass-official/assets/fonts/**/*',
                            'js/bower/requirejs/require.js',
                            'index.html',
                            'images/*.{gif,png,jpg,jpeg}',
                            'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>/js/bower/select2',
                        dest: '<%= yeoman.dist %>/css',
                        src: [
                            '*.{gif,png,jpg,jpeg}'
                        ]
                    }
                ]
            }
        },

        sass: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files: {
                    "<%= yeoman.app %>/css/style.css": "<%= yeoman.app %>/sass/main.scss"
                }
            },
            bs: {
                files: {
                    "<%= yeoman.app %>/css/bootstrap.css": "<%= yeoman.app %>/sass/bs.scss"
                }
            }
        },

        watch: {
            css: {
                files: "<%= yeoman.app %>/**/*.scss",
                tasks: ['sass']
            }
        },

        replace: {
            dist: {
                options: {
                    variables: {
                        version: '<%= pkg.name %>-<%= pkg.version %>',
                        timestamp: '<%= grunt.template.today() %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= yeoman.dist %>/index.html',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },


        compress: {
            tgz: {
                options: {
                    archive: "<%= yeoman.distrib %>/<%= pkg.name %>-<%= pkg.version %>.tar.gz"
                },
                files: [
                    {cwd: 'dist/', src: ['**'], expand: true, dest: "<%= pkg.name %>-<%= pkg.version %>/"}
                ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'imagemin',
        'concat',
        'requirejs:dist',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin',
        'replace',
        'compress'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);

    grunt.registerTask('build-rjs', [
        'requirejs:dist'
    ]);
};