"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const AccessToken_1 = require("./AccessToken");
const testApiKey = 'abcdefg';
const testSecret = 'abababa';
describe('encoded tokens are valid', () => {
    const t = new AccessToken_1.AccessToken(testApiKey, testSecret, {
        identity: 'me',
        name: 'myname',
    });
    t.addGrant({ room: 'myroom' });
    const token = t.toJwt();
    const decoded = jwt.verify(token, testSecret, { jwtid: 'me' });
    it('can be decoded', () => {
        expect(decoded).not.toBe(undefined);
    });
    it('has name set', () => {
        expect(decoded.name).toBe('myname');
    });
    it('has video grants set', () => {
        expect(decoded.video).toBeTruthy();
        expect(decoded.video.room).toEqual('myroom');
    });
});
describe('identity is required for only join grants', () => {
    it('allows empty identity for create', () => {
        const t = new AccessToken_1.AccessToken(testApiKey, testSecret);
        t.addGrant({ roomCreate: true });
        expect(t.toJwt()).toBeTruthy();
    });
    it('throws error when identity is not provided for join', () => {
        const t = new AccessToken_1.AccessToken(testApiKey, testSecret);
        t.addGrant({ roomJoin: true });
        expect(() => {
            t.toJwt();
        }).toThrow();
    });
});
describe('verify token is valid', () => {
    it('can decode encoded token', () => {
        var _a;
        const t = new AccessToken_1.AccessToken(testApiKey, testSecret);
        t.sha256 = 'abcdefg';
        t.addGrant({ roomCreate: true });
        const v = new AccessToken_1.TokenVerifier(testApiKey, testSecret);
        const decoded = v.verify(t.toJwt());
        expect(decoded).not.toBe(undefined);
        expect(decoded.sha256).toEqual('abcdefg');
        expect((_a = decoded.video) === null || _a === void 0 ? void 0 : _a.roomCreate).toBeTruthy();
    });
});
//# sourceMappingURL=AccessToken.test.js.map