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
exports.CancelableFormControl = void 0;
const fa_1 = require("react-icons/fa");
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const component_utils_1 = require("../component-utils");
const CancelableFormControl = (_a) => {
    var { onCancel, inputClassName, inputStyle } = _a, formControlProps = __rest(_a, ["onCancel", "inputClassName", "inputStyle"]);
    const value = formControlProps.value;
    const _b = formControlProps.style || {}, { width } = _b, remainingFormControlStyles = __rest(_b, ["width"]);
    return (react_1.default.createElement("div", { className: (0, component_utils_1.combineClassNames)('d-flex align-items-center position-relative', formControlProps.className), style: Object.assign({ width: width || '100%' }, remainingFormControlStyles) },
        react_1.default.createElement(react_bootstrap_1.Form.Control, Object.assign({}, formControlProps, { className: inputClassName, style: Object.assign({ paddingRight: '2rem' }, inputStyle), onKeyDown: (e) => {
                if (onCancel && !!value && e.key === 'Escape') {
                    e.preventDefault();
                    onCancel();
                }
                if (formControlProps.onKeyDown) {
                    formControlProps.onKeyDown(e);
                }
            } })),
        onCancel && value && value.toString().length > 0 && (react_1.default.createElement("div", { className: "p-2 d-flex align-items-center text-dark cursor-pointer position-absolute end-0", onClick: () => {
                if (onCancel) {
                    onCancel();
                }
            } },
            react_1.default.createElement(fa_1.FaTimesCircle, null)))));
};
exports.CancelableFormControl = CancelableFormControl;
