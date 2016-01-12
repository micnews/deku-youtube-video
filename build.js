'use strict';

require('es6-promise').polyfill();

var fs = require('fs');
var postcss = require('postcss');

var css = fs.readFileSync(__dirname + '/index.css', 'utf8');

postcss([ require('postcss-assets') ])
  .process(css, { from: 'index.css', to: 'index.css' })
  .then(function (result) {
    fs.writeFileSync('dist/index.css', result.css);
    if (result.map) fs.writeFileSync('index.css.map', result.map);
  });
