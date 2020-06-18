# ydke.js

Convert Yu-Gi-Oh! deck lists between `ydke://` URL form and passcode arrays.
For Node.js only. TypeScript-compatible and dependency-free.

`ydke://` URLs are a compact Yu-Gi-Oh! deck serialization format, used in
[Project Ignis: EDOPro](https://github.com/edo9300/edopro) and at
[YGOPRODECK](https://ygoprodeck.com/deck-search/).

## Example usage
```js
const ydke = require("ydke"); // ES6: import * as ydke from "ydke";
ydke.parseURL("ydke://o6lXBZyFNAI=!viOnAg==!7ydRAA==!");
/*
{
  main: Uint32Array(2) [ 89631139, 36996508 ],
  extra: Uint32Array(1) [ 44508094 ],
  side: Uint32Array(1) [ 5318639 ]
}
*/
ydke.toURL({
    main: Uint32Array.from([46986414, 44095762]),
    extra: Uint32Array.from([01861629]),
    side: Uint32Array.from([])
});
// "ydke://rvTMAhLZoAI=!/WccAA==!!"
```

## License
GNU Lesser General Public License 3.0 or later. See COPYING and COPYING.LESSER.

This package is part of [Project Ignis](https://github.com/ProjectIgnis).

Yu-Gi-Oh! is a trademark of Studio Dice, Shueisha, and Konami.
