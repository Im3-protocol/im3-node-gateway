"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookReceiver = exports.authorizeHeader = void 0;
const crypto_1 = __importDefault(require("crypto"));
const AccessToken_1 = require("./AccessToken");
const livekit_webhook_1 = require("./proto/livekit_webhook");
exports.authorizeHeader = 'Authorize';
class WebhookReceiver {
    constructor(apiKey, apiSecret) {
        this.verifier = new AccessToken_1.TokenVerifier(apiKey, apiSecret);
    }
    /**
     *
     * @param body string of the posted body
     * @param authHeader `Authorization` header from the request
     * @param skipAuth true to skip auth validation
     * @returns
     */
    receive(body, authHeader, skipAuth = false) {
        // verify token
        if (!skipAuth) {
            if (!authHeader) {
                throw new Error('authorization header is empty');
            }
            const claims = this.verifier.verify(authHeader);
            // confirm sha
            const hash = crypto_1.default.createHash('sha256');
            hash.update(body);
            if (claims.sha256 !== hash.digest('base64')) {
                throw new Error('sha256 checksum of body does not match');
            }
        }
        return livekit_webhook_1.WebhookEvent.fromJSON(JSON.parse(body));
    }
}
exports.WebhookReceiver = WebhookReceiver;
//# sourceMappingURL=WebhookReceiver.js.map