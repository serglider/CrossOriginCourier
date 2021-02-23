import { DataHandler, EventHandler } from './types';

export function createCustomHandler(handler: DataHandler): EventHandler {
    return function ({ data }: MessageEvent) {
        handler(data);
    };
}

export function isFunction(func: any): boolean {
    return typeof func === 'function';
}
