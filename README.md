# A Personal Web Development Template

## How to costumize

### Add all the .js files to gulpfile.js:
#### Example:
jsSources = [
    'components/scripts/name1.js',
    'components/scripts/name2.js',
    'components/scripts/name3.js',
    'components/scripts/name4.js'
];

### Add any package using this npm command:

```bash
npm install --save-dev jquery
```

Require JQUERY and such libraries at the top of one of .js files and it will be imported automatically (by browserify).
#### Example:
$ = require('jquery');

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information