import Courier from './Courier';
import { JointOptions } from './types';
declare type CourierInstance = InstanceType<typeof Courier>;
/**
 * Prepares a connection channel and returns a Promise which resolves once the connection established.
 */
export default function createConnection(config: Partial<JointOptions>): Promise<CourierInstance>;
export {};
