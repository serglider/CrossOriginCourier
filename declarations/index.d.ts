import { DataHandler, CrossOriginCourierOptions } from './types';
declare type CrossOriginCourierInstance = InstanceType<typeof CrossOriginCourier>;
export default class CrossOriginCourier {
    private readonly options;
    private isConnected;
    private port;
    private connectResolver;
    private handler;
    constructor(options: Partial<CrossOriginCourierOptions>);
    /**
     * Prepares a connection channel and returns a Promise which resolves once the connection established.
     * @param dataHandler
     * @public
     */
    connect(dataHandler: DataHandler): Promise<CrossOriginCourierInstance>;
    /**
     * Sends data to the counterparty given the connection is established.
     * If not, it issues a warning message in the console.
     * @param data
     * @public
     */
    send(data: any): void;
    /**
     * Prepares a connection channel employing MessageChannel and issues a ping to the parent context.
     * @private
     */
    initChild(): void;
    /**
     * Prepares a connection channel by setting a listener to a ping from the child context.
     * @private
     */
    initParent(): void;
    /**
     * On ping from the parent context, sets a message listener and resolves the connection promise.
     * @private
     */
    onPingFromParent({ data }: MessageEvent): void;
    /**
     * On ping from the child context, sets a message listener and resolves the connection promise.
     * @private
     */
    onPingFromChild({ data, ports }: MessageEvent): void;
}
export {};
