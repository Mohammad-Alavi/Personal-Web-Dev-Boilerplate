# A Personal Web Development Template
A personal template of my web development workflow to use as a starting point for other web projects.

Using:
- sass
- gulp.js
- [normalize.css](https://necolas.github.io/normalize.css/)

You can use:
- [modernizr.js](https://modernizr.com/) for featyre detection
- [jquery](https://jquery.com/) for better js
- [bootstrap](http://getbootstrap.com/) for responsive design
- [angular.js](https://angularjs.org/) for better html

## How to costumize

### Add all the .js files to gulpfile.js:
#### Example:
jsSources = [
    'components/scripts/name1.js',
    'components/scripts/name2.js',
    'components/scripts/name3.js',
    'components/scripts/name4.js'
];

and so on
### Add any package using this npm command:

```bash
npm install --save-dev jquery
```

Require JQUERY and such libraries at the top of one of .js files and it will be imported automatically (by browserify).
#### Example:
$ = require('jquery');

### Import any aditional css into style.scss (components/sass) and put them into builds/css. It will automatically concated in style.css and make them one .css.
#### Example style.scss:
@import "normalize.css";
-------------
## Reminder
### Fill these:
lang="" in html
title=""
content="" in meta
change favicon
-------------
## License

The MIT License (MIT). Please see [License File](LICENSE) for more information