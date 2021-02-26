export declare type DataHandler = (data: any) => void;
export declare type EventHandler = (event: MessageEvent) => void;
declare type TargetOrigin = '*' | `${'https' | 'http'}://${string}.${string}`;
export declare type CrossOriginCourierOptions = {
    passphrase: string;
    targetOrigin: TargetOrigin;
    isParent: boolean;
};
export {};
