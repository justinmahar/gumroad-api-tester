"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextualResults = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const fa_1 = require("react-icons/fa");
const IconButton_1 = require("./IconButton");
const ContextualResults = (_a) => {
    var { json } = _a, divProps = __rest(_a, ["json"]);
    if (typeof json === 'object') {
        const results = json;
        let products = [];
        if (results.products && Array.isArray(results.products)) {
            products = results.products;
        }
        else if (results.product) {
            products = [results.product];
        }
        if (products.length > 0) {
            const resultsElements = products
                .filter((product) => !!product.name && !!product.short_url)
                .map((product, index) => (react_1.default.createElement(react_bootstrap_1.Stack, { direction: "horizontal", key: `product-${index}`, gap: 2 },
                react_1.default.createElement("a", { className: "gumroad-button", href: `https://gumroad.com/l/${product.short_url.replace(/\/$/, '').replace(/.*\//, '')}` }, product.name),
                react_1.default.createElement("a", { href: product.short_url, target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement(IconButton_1.IconButton, { icon: fa_1.FaExternalLinkAlt, variant: "link" })))));
            if (resultsElements.length > 0) {
                return (react_1.default.createElement(react_bootstrap_1.Stack, Object.assign({ gap: 3 }, divProps), resultsElements));
            }
        }
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.ContextualResults = ContextualResults;
