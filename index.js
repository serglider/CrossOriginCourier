function createCustomHandler(handler) {
    return function ({ data }) {
        handler(data);
    };
}

function isFunction(func) {
    return typeof func === 'function';
}

const defaultOptions = {
    dataHandler: (data) => {},
    passphrase: 'DEFAULT_PASSPHRASE',
    isParent: false,
    targetOrigin: '*',
};

// https://medium.com/openmindonline/js-monday-17-publishing-a-typescript-library-59dd8200f80d
// https://basarat.gitbook.io/typescript/library
export default class CrossOriginCourier {
    constructor(options) {
        this._options = Object.assign(defaultOptions, options);
        this._port = null;
        this._connectResolver = null;
    }

    connect(dataHandler) {
        if (!isFunction(dataHandler)) {
            return Promise.resolve('Invalid data handler');
        }
        this._handler = createCustomHandler(dataHandler);
        return new Promise((resolve) => {
            this._connectResolver = resolve;
            const { isParent } = this._options;
            if (isParent) {
                this._initParent();
            } else {
                this._initChild();
            }
        });
    }

    send(data) {
        if (this._connectResolver) {
            this._port.postMessage(data);
        } else {
            console.warn('receiver is not connected');
        }
    }

    _initChild() {
        const { passphrase, targetOrigin } = this._options;
        const channel = new MessageChannel();
        this._port = channel.port1;
        this._port.onmessage = this._onPingFromParent.bind(this);
        window.parent.postMessage(passphrase, targetOrigin, [channel.port2]);
    }

    _initParent() {
        const onInitMessage = this._onPingFromChild.bind(this);
        window.addEventListener('message', onInitMessage);
    }

    _onPingFromParent({ data }) {
        const { passphrase } = this._options;
        if (passphrase === data) {
            this._port.onmessage = this._handler;
            this._connectResolver(this);
        }
    }

    _onPingFromChild({ data, ports }) {
        const { passphrase } = this._options;
        const isOk = data === passphrase && ports && ports[0];
        if (isOk) {
            this._port = ports[0];
            this._port.onmessage = this._handler;
            this._port.postMessage(passphrase);
            this._connectResolver(this);
        }
    }
}
