# A Personal Web Development Template
**A personal template of my web development workflow to use as a starting point for other web projects.**

Using:
- [sass](http://sass-lang.com/) for beter css
- [gulp.js](http://gulpjs.com/) for task automation
- [normalize.css](https://necolas.github.io/normalize.css/)

You can use:
- [modernizr.js](https://modernizr.com/) for feature detection
- [jquery](https://jquery.com/) for better js
- [bootstrap](http://getbootstrap.com/) for responsive design
- [angular.js](https://angularjs.org/) for better html
- [Respond.js](https://github.com/scottjehl/Respond) to enable media query support for older browsers like IE8

## How to costumize

### Add all the .js files to gulpfile.js:
#### Example:

```javascript
jsSources = [
    'components/scripts/name1.js',
    'components/scripts/name2.js',
    'components/scripts/name3.js',
    'components/scripts/name4.js'
];
```

### Add any package using this npm command:

```bash
npm install --save-dev jquery
```

Require JQUERY and such libraries at the top of one of .js files and it will be imported automatically (by browserify).
#### Example:

```javascript
$ = require('jquery');
```

### Import any aditional css into style.scss (components/sass) and put them into builds/css. It will be automatically merged with style.css.
#### Example:

```scss
@import "normalize.css";
```

## Reminder
### Fill these for every project:
    In index.html:
        lang="" in <html>
        title="" in <title>
        content="" in <meta>
        change favicon

    Edit 404.html

### If you are using Bootstrap do the fallowing to get a nice grid display
1. Change body starting tag to this
```html
<body data-grid-framework="b3" data-grid-color="black" data-grid-opacity="0.3" data-grid-zindex="999"
          data-grid-gutterwidth="30px" data-grid-nbcols="12"> 
```
2. Bookmark this in your browser
```javascript
javascript:(function() {   var head = document.getElementsByTagName("head")[0];   var bklScript = document.createElement("script");   bklScript.type = "text/javascript";   bklScript.src = "http://alefeuvre.github.com/foundation-grid-displayer/gd-bookmarklet.min.js";   head.appendChild(bklScript); })();
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information