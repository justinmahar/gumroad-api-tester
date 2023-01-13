"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallbackSrc = exports.combineClassNames = void 0;
/**
 * Combines an array of class names into one string, ignoring any undefined items.
 * @param classNames Array of class names to combine. Any undefine items will be ignored.
 * @returns A string combining all class names.
 */
const combineClassNames = (...classNames) => {
    return classNames.filter((cn) => cn && !!cn.trim()).join(' ');
};
exports.combineClassNames = combineClassNames;
const fallbackSrc = (src) => {
    return (event) => {
        var _a;
        if ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.src) {
            event.target.src = src;
        }
    };
};
exports.fallbackSrc = fallbackSrc;
