import { createCustomHandler, isFunction } from './utils';
import { DataHandler, EventHandler, CrossOriginCourierOptions } from './types';
import defaultOptions from './defaults';

type CrossOriginCourierInstance = InstanceType<typeof CrossOriginCourier>;

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
     * Prepares a connection channel and returns a Promise which resolves once the connection established.
     * @param dataHandler
     * @public
     */
    connect(dataHandler: DataHandler): Promise<CrossOriginCourierInstance> {
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
     * Sends data to the counterparty given the connection is established.
     * If not, it issues a warning message in the console.
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
     * Prepares a connection channel employing MessageChannel and issues a ping to the parent context.
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
     * Prepares a connection channel by setting a listener to a ping from the child context.
     * @private
     */
    initParent() {
        const onInitMessage = this.onPingFromChild.bind(this);
        window.addEventListener('message', onInitMessage);
    }

    /**
     * On ping from the parent context, sets a message listener and resolves the connection promise.
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
     * On ping from the child context, sets a message listener and resolves the connection promise.
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
