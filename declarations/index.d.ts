import { DataHandler, CrossOriginCourierOptions } from './types';
export default class CrossOriginCourier {
    private readonly options;
    private isConnected;
    private port;
    private connectResolver;
    private handler;
    constructor(options: Partial<CrossOriginCourierOptions>);
    /**
     * todo
     * @param dataHandler
     * @public
     */
    connect(dataHandler: DataHandler): Promise<this>;
    /**
     * todo
     * @param data
     * @public
     */
    send(data: any): void;
    /**
     * todo
     * @private
     */
    initChild(): void;
    /**
     * todo
     * @private
     */
    initParent(): void;
    /**
     * todo
     * @private
     */
    onPingFromParent({ data }: MessageEvent): void;
    /**
     * todo
     * @private
     */
    onPingFromChild({ data, ports }: MessageEvent): void;
}
