![npm](https://img.shields.io/npm/v/cross-origin-courier)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/cross-origin-courier)
![NPM](https://img.shields.io/npm/l/cross-origin-courier)
![GitHub top language](https://img.shields.io/github/languages/top/serglider/CrossOriginCourier)

# cross-origin-courier

description - todo

## Usage
todo

## Setup

#### NPM

```bash
npm i cross-origin-courier
```

```js
import CrossOriginCourier from 'cross-origin-courier';
// ...
const courier = new CrossOriginCourier();
```

#### CDN

```html
<script src="https://unpkg.com/cross-origin-courier"></script>
```

```js
const courier = new window.CrossOriginCourier();
```

## Options

```js
const options = {
    passphrase: 'foo-bar-baz-qux',
    isParent: true,
    targetOrigin: '*',
};
const courier = new CrossOriginCourier(options);
```

|         Option |  Type   |              Default | Description |
| -------------: | :-----: | -------------------: | :---------- |
|   `passphrase` | string  | 'DEFAULT_PASSPHRASE' | todo        |
| `targetOrigin` | string  |                 '\*' | todo        |
|     `isParent` | boolean |                false | todo        |


## Documentation

Please find the full docs [here](https://serglider.github.io/CrossOriginCourier/)

## License

Copyright © 2021, [Sergey Chernykh](https://github.com/serglider). Released under the [MIT License](LICENSE).
