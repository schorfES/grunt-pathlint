module.exports = function(grunt) {
	// project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/**/*.js',
				'tests/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		jscs: {
			all: [
				'Gruntfile.js',
				'tasks/**/*.js',
				'tests/*.js'
			]
		},

		nodeunit: {
			all: [
				'tests/test_*.js'
			]
		},

		lintspaces: {
			all: {
				src: [
					'Gruntfile.js',
					'tasks/**/*.js',
					'tests/*.js',
					'README.md'
				],
				options: {
					editorconfig: '.editorconfig'
				}
			}
		},

		pathlint: {
			testing: {
				src: 'tests/fixtures/**',
				options: {
					file: /^(_?[a-z0-9]|_)+\.(js)$/,
					dir: /^([a-z0-9]|_)+$/
				}
			}
		}
	});

	// load tasks
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-lintspaces');

	// define tasks
	grunt.registerTask('test', [
		'nodeunit:all'
	]);

	grunt.registerTask('validate', [
		'jshint:all',
		'jscs:all',
		'lintspaces:all'
	]);

	grunt.registerTask('default', [
		'validate',
		'test'
	]);
};
