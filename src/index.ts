import { createCustomHandler, isFunction } from './utils';
import { DataHandler, EventHandler, CrossOriginCourierOptions } from './types';

const defaultOptions = {
    passphrase: 'DEFAULT_PASSPHRASE',
    isParent: false,
    targetOrigin: '*',
};

export default class CrossOriginCourier {
    private readonly options: CrossOriginCourierOptions;
    private isConnected: boolean;
    private port!: MessagePort;
    private connectResolver!: (value: PromiseLike<this> | this) => void;
    private handler!: EventHandler;

    constructor(options: Partial<CrossOriginCourierOptions>) {
        this.options = Object.assign(defaultOptions, options);
        this.isConnected = false;
    }

    /**
     * todo
     * @param dataHandler
     * @public
     */
    connect(dataHandler: DataHandler): Promise<this> {
        if (!isFunction(dataHandler)) {
            return Promise.reject('Invalid data handler');
        }
        this.handler = createCustomHandler(dataHandler);
        return new Promise((resolve) => {
            this.connectResolver = resolve;
            const { isParent } = this.options;
            if (isParent) {
                this.initParent();
            } else {
                this.initChild();
            }
        });
    }

    /**
     * todo
     * @param data
     * @public
     */
    send(data: any) {
        if (this.isConnected) {
            (this.port as MessagePort).postMessage(data);
        } else {
            console.warn('receiver is not connected');
        }
    }

    /**
     * todo
     * @private
     */
    initChild() {
        const { passphrase, targetOrigin } = this.options;
        const channel = new MessageChannel();
        this.port = channel.port1;
        this.port.onmessage = this.onPingFromParent.bind(this);
        window.parent.postMessage(passphrase, targetOrigin, [channel.port2]);
    }

    /**
     * todo
     * @private
     */
    initParent() {
        const onInitMessage = this.onPingFromChild.bind(this);
        window.addEventListener('message', onInitMessage);
    }

    /**
     * todo
     * @private
     */
    onPingFromParent({ data }: MessageEvent) {
        const { passphrase } = this.options;
        if (passphrase === data) {
            (this.port as MessagePort).onmessage = this.handler;
            this.connectResolver(this);
            this.isConnected = true;
        }
    }

    /**
     * todo
     * @private
     */
    onPingFromChild({ data, ports }: MessageEvent) {
        const { passphrase } = this.options;
        const isOk = data === passphrase && ports && ports[0];
        if (isOk) {
            this.port = ports[0];
            this.port.onmessage = this.handler;
            this.port.postMessage(passphrase);
            this.connectResolver(this);
            this.isConnected = true;
        }
    }
}
