"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
/*
 * More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 * More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 */
const react_1 = __importDefault(require("react"));
const GumroadAPITester_1 = require("../components/GumroadAPITester");
exports.default = {
    title: 'Tools/Gumroad API',
    component: GumroadAPITester_1.GumroadAPITester,
    parameters: {
        controls: {
            disabled: true,
        },
        options: { showPanel: false },
    },
};
const Template = (args) => react_1.default.createElement(GumroadAPITester_1.GumroadAPITester, Object.assign({}, args));
exports.Tester = Template.bind({});
exports.Tester.args = {};
exports.Tester.story = {
    name: 'Tester',
};
