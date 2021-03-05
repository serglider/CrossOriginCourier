export type DataHandler = (data: any) => void;
export type EventHandler = (event: MessageEvent) => void;
type TargetOrigin = '*' | `${'https' | 'http'}://${string}.${string}`;
export type JointOptions = {
    passphrase: string;
    targetOrigin: TargetOrigin;
    isParent: boolean;
};
