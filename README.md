Geezify-js  ![From Ethiopia](https://img.shields.io/badge/From-Ethiopia-brightgreen.svg)
==========

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

console.log(geez.toGeez('፻፳፫'));                // 123
console.log(geez.toGeez('፲፪፻፴፬'));              // 1234
console.log(geez.toGeez('፲፱፻፹፮'));              // 1986
console.log(geez.toGeez('፻፼'));                 // 1000000
```

License
-------
Geezify-js is released under the MIT Licence. See the bundled LICENSE file for details.
