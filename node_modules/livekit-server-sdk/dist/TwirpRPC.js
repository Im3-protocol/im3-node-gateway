"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwirpRpc = exports.livekitPackage = void 0;
const axios_1 = __importDefault(require("axios"));
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
// twirp RPC adapter for client implementation
const defaultPrefix = '/twirp';
exports.livekitPackage = 'livekit';
/**
 * JSON based Twirp V7 RPC
 */
class TwirpRpc {
    constructor(host, pkg, prefix) {
        this.host = host;
        this.pkg = pkg;
        this.prefix = prefix || defaultPrefix;
        this.instance = axios_1.default.create({
            baseURL: host,
        });
    }
    request(service, method, data, headers) {
        return new Promise((resolve, reject) => {
            const path = `${this.prefix}/${this.pkg}.${service}/${method}`;
            this.instance
                .post(path, data, { headers })
                .then((res) => {
                resolve(camelcase_keys_1.default(res.data, { deep: true }));
            })
                .catch(reject);
        });
    }
}
exports.TwirpRpc = TwirpRpc;
//# sourceMappingURL=TwirpRPC.js.map