var
	path = require('path'),
	DEFAULTS = {
		file: /^.+$/,
		dir: /^.+$/
	}
;


module.exports = function(grunt) {

	grunt.task.registerMultiTask('pathlint', 'validate all pathes', function() {
		var
			options = this.options(DEFAULTS),
			fails = [],
			total = 0
		;

		this.files.forEach(function(file) {
			total += file.src.length;
			file.src.forEach(function(src) {
				if (grunt.file.isFile(src)) {
					if (!options.file.test(src.split(path.sep).pop())) {
						fails.push(
							'File "' + src.red +
							'" does not match required name convention "' +
							options.file.toString().green +
							'"'
						);
					}
				} else if (grunt.file.isDir(src)) {
					src.split(path.sep).forEach(function(name) {
						if (!options.dir.test(name)) {
							fails.push(
								'Directory "' +
								name.red +
								'" in "' +
								src.red +
								'" does not match required name convention "' +
								options.dir.toString().green +
								'"'
							);
						}
					});
				}
			});
		});

		if (fails.length > 0) {
			fails.forEach(function(fail) {
				grunt.log.writeln(fail);
			});
			grunt.fail.warn(
				'There are ' +
				fails.length +
				' incorrect in ' +
				total +
				' pathnames found.'
			);
		}
	});

};
