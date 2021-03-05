![npm](https://img.shields.io/npm/v/cross-origin-courier)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/cross-origin-courier)
![NPM](https://img.shields.io/npm/l/cross-origin-courier)
![GitHub top language](https://img.shields.io/github/languages/top/serglider/CrossOriginCourier)

> #### This project is in active development.
>
> #### Until major version released, the API is a subject to change.

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
import createConnection from 'cross-origin-courier';
// ...
createConnection().then(courier => {
    courier.listen(handler);
});

function handler(data) {
    // do your stuff
}
```

#### CDN

```html
<script src="https://unpkg.com/cross-origin-courier"></script>
```

```js
window.createConnection().then(courier => {
    courier.listen(handler);
});

function handler(data) {
    // do your stuff
}
```

## Options

```js
const options = {
    passphrase: 'foo-bar-baz-qux',
    isParent: true,
    targetOrigin: '*',
};
createConnection(options).then(courier => {
    // ...
});
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
