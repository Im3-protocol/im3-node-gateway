import { WebhookEvent } from './proto/livekit_webhook';
export declare const authorizeHeader = "Authorize";
export declare class WebhookReceiver {
    private verifier;
    constructor(apiKey: string, apiSecret: string);
    /**
     *
     * @param body string of the posted body
     * @param authHeader `Authorization` header from the request
     * @param skipAuth true to skip auth validation
     * @returns
     */
    receive(body: string, authHeader?: string, skipAuth?: boolean): WebhookEvent;
}
