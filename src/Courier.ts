import { DataHandler } from './types';
import { createCustomHandler, isFunction } from './utils';

export default class Courier {
    private port: MessagePort;
    constructor(port: MessagePort) {
        this.port = port;
    }

    send(data: any) {
        this.port.postMessage(data);
    }

    listen(dataHandler: DataHandler) {
        if (!isFunction(dataHandler)) {
            throw new Error('Invalid data handler');
        }
        this.port.onmessage = createCustomHandler(dataHandler);
    }
}
