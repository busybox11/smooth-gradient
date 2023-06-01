
smooth-gradient.js
========================

Calculate a gradient and get one of its colors at a given point, from an array of colors.

Using smooth-gradient server side
---------------------------------
Install the smooth-gradient module

```bash
npm install smooth-gradient
```

Add it to your source.

```javascript
const Spectrum = require('smooth-gradient');
```

Usage
--------------------

A single class is exposed, `Spectrum`, which takes as much color elements as you want as parameters, and the amount of steps to use.

```javascript
// Colors can be given as an unlimited number of parameters
const grad = new Spectrum("FF0000", "00FF00", {r: 0, g:0, b:255}, "#000000");
```

You can now retreive the color corresponding to your input in the gradiant spectrum.
Only values between 0 and 100 are effective. Negatives will be considered as 0 and values above 100 as 100.

```javascript
const color = grad.getColor(45);
console.log(color); // output => Color { r: 0, g: 128, b: 128 }
```

This package could be a great fit for gradients in progress bars, for example.
