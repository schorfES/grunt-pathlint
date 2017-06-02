module.exports = function(grunt) {

	grunt.task.registerMultiTask('pathlint', 'validate all pathes', function() {
		var
			options = this.options({file: /^.+$/, dir: /^.+$/}),
			fails = [],
			total = 0
		;

		this.files.forEach(function(file) {
			total += file.src.length;
			file.src.forEach(function(path) {
				if (grunt.file.isFile(path)) {
					if (!options.file.test(path.split('/').pop())) {
						fails.push(
							'File "' + path.red +
							'" does not match required name convention "' +
							options.file.toString().green +
							'"'
						);
					}
				} else if (grunt.file.isDir(path)) {
					if (!options.dir.test(path)) {
						fails.push(
							'Directory "' +
							path.red +
							'" does not match required name convention "' +
							options.dir.toString().green +
							'"'
						);
					}
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
