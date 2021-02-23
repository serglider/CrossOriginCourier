export type DataHandler = (data: any) => void;
export type EventHandler = (event: MessageEvent) => void;
export type CrossOriginCourierOptions = {
    passphrase: string;
    targetOrigin: string;
    isParent: boolean;
};

export type Foobar = (event: MessageEvent) => void;
