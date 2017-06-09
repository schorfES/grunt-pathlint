# grunt-pathlint

A Grunt task for checking pathnames.

[![Travis Status](https://travis-ci.org/schorfES/grunt-pathlint.png?branch=master)](https://travis-ci.org/schorfES/grunt-pathlint)
![David DM Status](https://david-dm.org/schorfES/grunt-pathlint.svg?branch=master)

## Getting Started
_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide._

From the same directory as your project's Gruntfile and package.json, install
this plugin with the following command:

```bash
npm install grunt-pathlint --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-pathlint');
```

Inside your `grunt.js` file add a section named `pathlint`. This section
specifies the tasks. Each task takes sources and options as parameters.

## Parameters

### sources ```src```

This sets the path of the files and directories to be checked in this task.

## Options

### file option

A regular expression for a file name in a path matched by `src`. This validates
only the full filename and not the full path of the file.

Default is `/^.+$/` which allows all names.

### dir option

A regular expression for a directory name in a path matched by `src`. A full
path of a directory will be split and validated by it's containing directory
names. For example the path `foo/bar/baz/` will be split into `foo`, `bar` and
`baz`. Each of these sections will be validated by this regular expression. It's
not required to add any path seperators into the regular expression.

Default is `/^.+$/` which allows all names.

## Example

```javascript
	pathlint {
		js: {
			src: ['js/src/**/*'],
			options: {
				file: /^([a-zA-Z0-9])+\.(js)$/,
				dir: /^([a-z0-9])+$/
			}
		},
		scss: {
			src: ['scss/**/*'],
			options: {
				file: /^(_?[a-z0-9]|-)+\.(scss)$/
				// Do not test for dirs here, so all pathes are valid...
			}
		}
	}
```

## Contribution

### Tests & Validation

Run `grunt` to lint and run the tests.

## License

[LICENSE (MIT)](https://github.com/schorfES/grunt-lintspaces/blob/master/LICENSE)
