function createCustomHandler(handler) {
    return function ({ data }) {
        handler(data);
    };
}

function isFunction(func) {
    return typeof func === 'function';
}

const DEFAULT_PASSPHRASE = 'DEFAULT_PASSPHRASE';

export default class CrossOriginCourier {
    constructor() {
        this._passphrase = '';
        this._handler = null;
        this._port = null;
        this._connectResolver = null;
    }

    connect(handler, isParent, passphrase = DEFAULT_PASSPHRASE) {
        if (!isFunction(handler)) {
            return Promise.resolve('Invalid data handler');
        }
        this._handler = createCustomHandler(handler);
        this._passphrase = passphrase;
        return new Promise((resolve) => {
            this._connectResolver = resolve;

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
        const channel = new MessageChannel();
        this._port = channel.port1;
        this._port.onmessage = this._onPingFromParent.bind(this);
        window.parent.postMessage(this._passphrase, '*', [channel.port2]);
    }

    _initParent() {
        const onInitMessage = this._onPingFromChild.bind(this);
        window.addEventListener('message', onInitMessage);
    }

    _onPingFromParent() {
        this._port.onmessage = this._handler;
        this._connectResolver(this);
    }

    _onPingFromChild({ data, ports }) {
        const isOk = data === this._passphrase && ports && ports[0];
        if (isOk) {
            this._port = ports[0];
            this._port.onmessage = this._handler;
            this._port.postMessage('777');
            this._connectResolver(this);
        }
    }
}
