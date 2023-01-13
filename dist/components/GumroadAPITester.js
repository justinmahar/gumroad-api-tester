"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
require("bootswatch/dist/zephyr/bootstrap.min.css");
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_helmet_1 = require("react-helmet");
const fa_1 = require("react-icons/fa");
const react_use_window_localstorage_1 = require("react-use-window-localstorage");
const GumroadAPIWidget_1 = require("./content/GumroadAPIWidget");
const IconButton_1 = require("./content/IconButton");
let apiScriptLoaded = false;
function GumroadAPITester(props) {
    const [showInformationModal, setShowInformationModal, showInformationModalLoading] = (0, react_use_window_localstorage_1.useLocalStorageBoolean)('showInformationModal', true);
    const handleCloseInformationModal = () => setShowInformationModal(false);
    const [shouldLoadScript, setShouldLoadScript] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        if (!apiScriptLoaded) {
            setShouldLoadScript(true);
            apiScriptLoaded = true;
        }
    }, []);
    return (react_1.default.createElement("div", null,
        shouldLoadScript && (react_1.default.createElement(react_helmet_1.Helmet, null,
            react_1.default.createElement("script", { src: "https://gumroad.com/js/gumroad.js" }))),
        react_1.default.createElement("div", { className: "py-3" },
            react_1.default.createElement(react_bootstrap_1.Container, null,
                react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-5" },
                    react_1.default.createElement(react_bootstrap_1.Col, { md: { offset: 1, span: 10 }, lg: { offset: 2, span: 8 }, xl: { offset: 3, span: 6 } },
                        react_1.default.createElement(react_bootstrap_1.Stack, { direction: "horizontal", className: "flex-wrap justify-content-between mb-3", gap: 2 },
                            react_1.default.createElement(react_bootstrap_1.Stack, { direction: "horizontal", gap: 2 },
                                react_1.default.createElement("h4", { className: "p-0 m-0" }, "Gumroad API Tester"),
                                !showInformationModal && (react_1.default.createElement(IconButton_1.IconButton, { icon: fa_1.FaRegQuestionCircle, variant: "link", className: "text-info", size: "sm", onClick: () => setShowInformationModal(true) }))),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("a", { href: "https://app.gumroad.com/api", target: "_blank", rel: "noopener noreferrer" },
                                    react_1.default.createElement(IconButton_1.IconButton, { variant: "secondary", size: "sm", icon: fa_1.FaExternalLinkAlt, end: true }, "API Docs")))),
                        !showInformationModalLoading && showInformationModal && (react_1.default.createElement(react_bootstrap_1.Alert, { variant: "info", dismissible: true, className: "mb-3", onClose: handleCloseInformationModal },
                            react_1.default.createElement("h6", null, "Welcome!"),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("a", { href: "https://gumroad.com/" }, "Gumroad"),
                                " is a platform that allows you to sell digital products such as books, memberships, courses, and more."),
                            react_1.default.createElement("p", null,
                                "Below you can test out the ",
                                react_1.default.createElement("a", { href: "https://app.gumroad.com/api" }, "Gumroad API"),
                                " using your",
                                ' ',
                                react_1.default.createElement("a", { href: "https://app.gumroad.com/settings/advanced#application-form" }, "access token"),
                                ". This tool can also be helpful if you need to make changes not supported via the website, such as adding resource subscriptions."),
                            react_1.default.createElement("p", null,
                                "All v2 endpoints are available for quick selection, or you can manually enter things if you'd like. Some parameters are optional\u2014be sure to reference the",
                                ' ',
                                react_1.default.createElement("a", { href: "https://app.gumroad.com/api" }, "API docs"),
                                " when in doubt."),
                            react_1.default.createElement("p", null, "When retrieving products, buy buttons are shown so that you can test product purchases right from within this testing tool."),
                            react_1.default.createElement("p", null,
                                "Try the ",
                                react_1.default.createElement("code", { className: "px-1 border border-light rounded-2" }, "GET: /user"),
                                " endpoint for a quick test of your access token."),
                            react_1.default.createElement("p", null, "\uD83C\uDF89 Happy selling!"))),
                        react_1.default.createElement(GumroadAPIWidget_1.GumroadAPIWidget, null))),
                react_1.default.createElement(react_bootstrap_1.Row, null,
                    react_1.default.createElement(react_bootstrap_1.Col, null,
                        react_1.default.createElement("h4", { className: "text-center text-muted" },
                            "If this project helped you, please",
                            ' ',
                            react_1.default.createElement("a", { href: "https://github.com/justinmahar/gumroad-api-tester-webapp" }, "Star it on GitHub"),
                            " so others can find it. :)")))))));
}
exports.default = GumroadAPITester;
