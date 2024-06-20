"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleLogin = void 0;
const react_1 = __importDefault(require("react"));
const helper_1 = require("./helper");
const useScript_1 = __importDefault(require("./useScript"));
const AppleLogin = (props) => {
    const { clientId, redirectURI, state = "", render, designProp = {
        locale: "en_US"
    }, responseMode = "query", responseType = "code", nonce, callback, scope, autoLoad = false, usePopup = false } = props;
    const [loaded] = (0, useScript_1.default)(`https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/${(props &&
        props.designProp &&
        props.designProp.locale) ||
        "en_US"}/appleid.auth.js`);
    const onClick = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (e = null) {
        if (e) {
            e.preventDefault();
        }
        if (!usePopup) {
            window.location.href = `https://appleid.apple.com/auth/authorize?${(0, helper_1.generateQueryString)({
                response_type: responseType,
                response_mode: responseMode,
                client_id: clientId,
                redirect_uri: encodeURIComponent(redirectURI),
                state,
                nonce,
                scope: responseMode === "query" ? "" : scope
            })}`;
        }
        else {
            try {
                const data = yield AppleID.auth.signIn();
                if (typeof callback === "function" && data) {
                    callback(data);
                }
            }
            catch (err) {
                if (typeof callback === "function") {
                    callback({ error: err });
                }
            }
        }
    });
    react_1.default.useEffect(() => {
        if (!usePopup) {
            if (autoLoad) {
                onClick();
            }
            if (typeof callback === "function" &&
                responseMode === "query" &&
                responseType === "code" &&
                window &&
                window.location) {
                let match;
                const pl = /\+/g, // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g, decode = (s) => {
                    return decodeURIComponent(s.replace(pl, " "));
                }, query = window.location.search.substring(1);
                let urlParams = {};
                while ((match = search.exec(query))) {
                    urlParams[decode(match[1])] = decode(match[2]);
                }
                if (urlParams["code"]) {
                    callback({
                        code: urlParams["code"]
                    });
                }
            }
        }
        return () => { };
    }, []);
    react_1.default.useEffect(() => {
        if (usePopup && loaded) {
            AppleID.auth.init({
                clientId,
                scope,
                redirectURI: redirectURI ||
                    `${location.protocol}//${location.host}${location.pathname}`,
                state,
                nonce,
                usePopup
            });
            // Call on auto load.
            if (autoLoad) {
                onClick();
            }
        }
        return () => { };
    }, [loaded, usePopup]);
    if (typeof render === "function") {
        return render({ onClick });
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { "data-id": "appleid-signin", onClick: onClick },
            react_1.default.createElement("img", { src: `https://appleid.cdn-apple.com/appleid/button?${(0, helper_1.generateQueryString)(designProp)}` }))));
};
exports.AppleLogin = AppleLogin;
exports.default = AppleLogin;
//# sourceMappingURL=index.js.map