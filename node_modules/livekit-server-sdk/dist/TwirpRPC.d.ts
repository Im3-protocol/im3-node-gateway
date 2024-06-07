import { AxiosInstance } from 'axios';
export declare const livekitPackage = "livekit";
export interface Rpc {
    request(service: string, method: string, data: any, headers?: any): Promise<string>;
}
/**
 * JSON based Twirp V7 RPC
 */
export declare class TwirpRpc {
    host: string;
    pkg: string;
    prefix: string;
    instance: AxiosInstance;
    constructor(host: string, pkg: string, prefix?: string);
    request(service: string, method: string, data: any, headers?: any): Promise<any>;
}
