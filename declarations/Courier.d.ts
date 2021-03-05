import { DataHandler } from './types';
export default class Courier {
    private port;
    constructor(port: MessagePort);
    send(data: any): void;
    listen(dataHandler: DataHandler): void;
}
