import Courier from './Courier';
import { JointOptions } from './types';
import defaultOptions from './defaults';

type CourierInstance = InstanceType<typeof Courier>;

/**
 * Prepares a connection channel and returns a Promise which resolves once the connection established.
 */
export default function createConnection(config: Partial<JointOptions>): Promise<CourierInstance> {
    const options = Object.assign(defaultOptions, config);
    let connectResolver: (value: PromiseLike<CourierInstance> | CourierInstance) => void;
    let port: MessagePort;

    return new Promise(resolve => {
        connectResolver = resolve;
        if (options.isParent) {
            initParent();
        } else {
            initChild();
        }
    });

    /**
     * Prepares a connection channel employing MessageChannel and issues a ping to the parent context.
     * @private
     */
    function initChild() {
        const { passphrase, targetOrigin } = options;
        const channel = new MessageChannel();
        port = channel.port1;
        port.onmessage = onPingFromParent;
        window.parent.postMessage(passphrase, targetOrigin, [channel.port2]);
    }

    /**
     * Prepares a connection channel by setting a listener to a ping from the child context.
     * @private
     */
    function initParent() {
        window.addEventListener('message', onPingFromChild);
    }

    /**
     * On ping from the parent context, sets a message listener and resolves the connection promise.
     * @private
     */
    function onPingFromParent({ data }: MessageEvent) {
        const { passphrase } = options;
        if (passphrase === data) {
            const courier = new Courier(port);
            connectResolver(courier);
        }
    }

    /**
     * On ping from the child context, sets a message listener and resolves the connection promise.
     * @private
     */
    function onPingFromChild({ data, ports }: MessageEvent) {
        const { passphrase } = options;
        const isPingFromChild = data === passphrase && ports && ports[0];
        if (isPingFromChild) {
            const courier = new Courier(ports[0]);
            courier.send(passphrase);
            connectResolver(courier);
        }
    }
}
