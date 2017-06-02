var
	path = require('path'),
	exec = require('child_process').exec,
	EXEC_OPTIONS = {
		cwd: path.join(__dirname, '..')
	}
;

function __test(test, expected) {
	test.expect(expected.length);

	exec('grunt pathlint:testing', EXEC_OPTIONS, function(error, stdout) {
		var lines = stdout.split(/\r?\n/);

		expected.forEach(function(line) {
			for (var index = 0; index < lines.length; index++) {

				if (lines[index].indexOf(line) > -1) {
					test.ok(true);
					break;
				}
			}
		});

		test.done();
	});
}


exports.tests = {
	files: function(test) {
		__test(test, [
			'File "tests/fixtures/invalid-path/invalid_filename.html" does not match required name convention "/^(_?[a-z0-9]|_)+\\.(js)$/"',
			'File "tests/fixtures/invalid-path/invalid-filename.js" does not match required name convention "/^(_?[a-z0-9]|_)+\\.(js)$/"',
			'File "tests/fixtures/valid_path/invalid_filename.html" does not match required name convention "/^(_?[a-z0-9]|_)+\\.(js)$/"',
			'File "tests/fixtures/valid_path/invalid-filename.js" does not match required name convention "/^(_?[a-z0-9]|_)+\\.(js)$/"'
		]);
	},

	dirs: function(test) {
		__test(test, [
			'Directory "tests/fixtures/invalid-path/" does not match required name convention "/^(_?[a-z0-9]|_)+/"'
		]);
	},

	total: function(test) {
		__test(test, [
			'Warning: There are 4 incorrect in 9 pathnames found'
		]);
	}
};
