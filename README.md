![npm](https://img.shields.io/npm/v/cross-origin-courier)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/cross-origin-courier)
![NPM](https://img.shields.io/npm/l/cross-origin-courier)
![GitHub top language](https://img.shields.io/github/languages/top/serglider/CrossOriginCourier)

> #### This project is in active development.
>
> #### Until major version released, the API is a subject to change.

# cross-origin-courier

A wrapper over `Window.postMessage()` and `MessageChannel` to facilitate messaging between cross origin contexts.

The library exposes a connection function that returns a `Promise`. On a successful connection, the `Promise` is resolved with the `courier` object to be used to send and listen to messages. **Note**: the child frame should call the connection function first.

## Setup

#### NPM

```bash
npm i cross-origin-courier
```

```js
import connect from 'cross-origin-courier';
// ...
connect().then(courier => {
    courier.listen(handler);
    courier.send({ answer: 42 });
});

function handler(data) {
    // do your stuff
}
```

#### CDN

```html
<script src="https://unpkg.com/cross-origin-courier"></script>
```

Loaded this way, the connection function is exposed under the following long-ish name

```js
window.createCrossOrigConnection().then(courier => {
    // ...
});
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

## Courier API

|   Method |                 Arguments                 | Description                                  |
| -------: | :---------------------------------------: | :------------------------------------------- |
|   `send` | `data`<[any][structured_clone_algorithm]> | Sends data to the counterparty               |
| `listen` |    `dataHandler`<(data: any) => void>     | Sets a handler for the counterparty messages |

[structured_clone_algorithm]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

## Documentation

Please find the full docs [here](https://serglider.github.io/CrossOriginCourier/)

## License

Copyright © 2021, [Sergey Chernykh](https://github.com/serglider). Released under the [MIT License](LICENSE).
