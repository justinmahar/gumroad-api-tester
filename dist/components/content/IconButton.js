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
exports.IconButton = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const component_utils_1 = require("../component-utils");
const IconButton = (_a) => {
    var _b, _c, _d;
    var { block, icon, end, wrap } = _a, props = __rest(_a, ["block", "icon", "end", "wrap"]);
    const Icon = icon;
    const iconOnly = typeof props.children === 'undefined';
    const buttonElement = (react_1.default.createElement(react_bootstrap_1.Button, Object.assign({}, props, { className: (0, component_utils_1.combineClassNames)(iconOnly ? 'position-relative' : undefined, props.className) }),
        iconOnly && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Icon, { className: (0, component_utils_1.combineClassNames)('position-absolute top-50 start-50 translate-middle', (_b = props.iconProps) === null || _b === void 0 ? void 0 : _b.className) }),
            react_1.default.createElement(Icon, { className: (0, component_utils_1.combineClassNames)('invisible', (_c = props.iconProps) === null || _c === void 0 ? void 0 : _c.className) }))),
        !iconOnly && (react_1.default.createElement("div", { className: (0, component_utils_1.combineClassNames)('d-flex align-items-center justify-content-center gap-2', wrap ? 'flex-wrap' : 'text-nowrap') },
            react_1.default.createElement(Icon, Object.assign({}, props.iconProps, { className: (0, component_utils_1.combineClassNames)(end ? 'order-last' : undefined, (_d = props.iconProps) === null || _d === void 0 ? void 0 : _d.className) })),
            react_1.default.createElement("div", null, props.children)))));
    return block ? react_1.default.createElement("div", { className: "d-grid" }, buttonElement) : buttonElement;
};
exports.IconButton = IconButton;
