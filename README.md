Geezify-js  ![From Ethiopia](https://img.shields.io/badge/From-Ethiopia-brightgreen.svg)
==========

[![Build Status](https://travis-ci.org/geezify/geezify-js.svg?branch=master)](https://travis-ci.org/geezify/geezify-js)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/geezify/geezify-js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/geezify/geezify-js/?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/geezify/geezify-js/badge.svg?branch=master)](https://coveralls.io/github/geezify/geezify-js?branch=master)

This package is a library to convert ascii number like '**3456**' to geez number '**፴፬፻፶፮**' and vise versa.

 > Ge'ez (ግዕዝ) is an ancient South Semitic language that originated in Eritrea and the northern region of Ethiopia in the Horn of Africa. It later became the official language of the Kingdom of Aksum and Ethiopian imperial court.
 
click [here](https://en.wikipedia.org/wiki/Ge%27ez) to read more.

Installation
------------
```sh
npm install geezify-js
```

Usage
----------------
```js

geez = Geezify.create();

console.log(geez.toGeez(123));              // ፻፳፫
console.log(geez.toGeez(1234));             // ፲፪፻፴፬
console.log(geez.toGeez(1986));             // ፲፱፻፹፮
console.log(geez.toGeez(1000000));          // ፻፼

// or you can even do the reverse

console.log(geez.toAscii('፻፳፫'));                // 123
console.log(geez.toAscii('፲፪፻፴፬'));              // 1234
console.log(geez.toAscii('፲፱፻፹፮'));              // 1986
console.log(geez.toAscii('፻፼'));                 // 1000000
```

License
-------
Geezify-js is released under the MIT Licence. See the bundled LICENSE file for details.
