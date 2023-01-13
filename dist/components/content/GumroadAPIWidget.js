"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GumroadAPIWidget = void 0;
const react_bootstrap_1 = require("react-bootstrap");
const react_bootstrap_2 = require("react-bootstrap");
const fa_1 = require("react-icons/fa");
const ai_1 = require("react-icons/ai");
const ai_2 = require("react-icons/ai");
const fa_2 = require("react-icons/fa");
const fa_3 = require("react-icons/fa");
const fa_4 = require("react-icons/fa");
const im_1 = require("react-icons/im");
const react_1 = __importDefault(require("react"));
const react_bootstrap_3 = require("react-bootstrap");
const react_use_window_localstorage_1 = require("react-use-window-localstorage");
const styled_components_1 = __importDefault(require("styled-components"));
const component_utils_1 = require("../component-utils");
const CancelableFormControl_1 = require("../widgets/CancelableFormControl");
const ContextualResults_1 = require("./ContextualResults");
const IconButton_1 = require("./IconButton");
const v2api_1 = require("./v2api");
const react_json_tree_1 = require("react-json-tree");
const API_ROOT_DEFAULT = 'https://api.gumroad.com/v2';
const GumroadAPIWidget = (props) => {
    const [apiRoot, setAPIRoot] = (0, react_use_window_localstorage_1.useLocalStorageString)('gumroadAPIRoot', API_ROOT_DEFAULT);
    const [accessToken, setAccessToken] = react_1.default.useState('');
    const [endpointUrl, setEndpointUrl] = (0, react_use_window_localstorage_1.useLocalStorageString)('gumroadEndpointUrl', '');
    const [method, setMethod] = (0, react_use_window_localstorage_1.useLocalStorageString)('gumroadMethod', 'GET');
    const [urlParams, setUrlParams] = (0, react_use_window_localstorage_1.useLocalStorageObject)('gumroadUrlParams', []);
    const [params, setParams] = (0, react_use_window_localstorage_1.useLocalStorageObject)('gumroadParams', []);
    const [status, setStatus] = react_1.default.useState(-1);
    const [response, setResponse] = react_1.default.useState('');
    const [fetchTime, setFetchTime] = react_1.default.useState(0);
    const [errorMessage, setErrorMessage] = react_1.default.useState('');
    const [successMessage, setSuccessMessage] = react_1.default.useState('');
    const [wasSuccessful, setWasSuccessful] = react_1.default.useState();
    const [selectedEndpointIndex, setSelectedEndpointIndex] = react_1.default.useState(-1);
    const selectedEndpoint = selectedEndpointIndex >= 0 && selectedEndpointIndex < v2api_1.v2Api.length ? v2api_1.v2Api[selectedEndpointIndex] : undefined;
    const [showParams, setShowParams] = (0, react_use_window_localstorage_1.useLocalStorageBoolean)('showParams', false);
    const [lastFetchMethod, setLastFetchMethod] = react_1.default.useState('');
    const [lastFetchUrl, setLastFetchUrl] = react_1.default.useState('');
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = react_1.default.useState(false);
    let statusLabel = `${status}`;
    switch (status) {
        case 200:
            statusLabel = `${status}: OK`;
            break;
        case 400:
            statusLabel = `${status}: Bad Request`;
            break;
        case 401:
            statusLabel = `${status}: Unauthorized`;
            break;
        case 402:
            statusLabel = `${status}: Request Failed`;
            break;
        case 404:
            statusLabel = `${status}: Not Found`;
            break;
        case 500:
        case 502:
        case 503:
        case 504:
            statusLabel = `${status}: Server Error`;
            break;
        default:
    }
    const handleSend = () => {
        if (apiRoot && endpointUrl && accessToken && method) {
            const queryParams = [{ k: 'access_token', v: accessToken }, ...(method === 'GET' ? params : [])];
            let finalizedEndpointUrl = endpointUrl;
            urlParams.forEach((urlParam) => {
                finalizedEndpointUrl = finalizedEndpointUrl.replace(`:${urlParam.k}`, encodeURIComponent(urlParam.v));
            });
            const fetchUrl = apiRoot.replace(/\/$/, '') +
                (finalizedEndpointUrl.startsWith('/') ? '' : '/') +
                finalizedEndpointUrl +
                '?' +
                queryParams
                    .filter((param) => param.k.length > 0 && param.v.length > 0)
                    .map((param) => `${encodeURIComponent(param.k)}=${encodeURIComponent(param.v)}`)
                    .join('&');
            console.log(fetchUrl);
            const paramMap = {};
            params.forEach((param) => {
                if (param.k.length > 0 && param.v.length > 0) {
                    paramMap[param.k] = param.v;
                }
            });
            fetch(fetchUrl, {
                method,
                headers: method !== 'GET'
                    ? {
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }
                    : undefined,
                body: method !== 'GET' ? JSON.stringify(paramMap) : undefined,
            })
                .then((response) => {
                setStatus(response.status);
                return response.text();
            })
                .then((data) => {
                setResponse(data);
                let newErrorMessage = undefined;
                let newSuccessMessage = undefined;
                let newWasSuccessful = undefined;
                try {
                    const json = JSON.parse(data);
                    if (typeof json.success !== 'undefined' && !json.success && typeof json.message === 'string') {
                        newErrorMessage = json.message;
                        newWasSuccessful = false;
                    }
                    else if (typeof json.success !== 'undefined' && json.success) {
                        newWasSuccessful = true;
                        if (typeof json.message === 'string') {
                            newSuccessMessage = json.message;
                        }
                        else {
                            newSuccessMessage = 'Your request was successful.';
                        }
                    }
                    else if (typeof json.error === 'string') {
                        newErrorMessage = json.error;
                        newWasSuccessful = false;
                    }
                }
                catch (e) { }
                setErrorMessage(newErrorMessage);
                setSuccessMessage(newSuccessMessage);
                setWasSuccessful(newWasSuccessful);
            })
                .catch((e) => {
                console.error(e);
                setErrorMessage(`${e}`);
            })
                .finally(() => {
                setLastFetchMethod(method);
                setLastFetchUrl(fetchUrl);
                setFetchTime(new Date().getTime());
            });
        }
    };
    const handleReset = () => {
        setAPIRoot(API_ROOT_DEFAULT);
        setAccessToken('');
        setEndpointUrl('');
        setMethod('GET');
        setUrlParams([]);
        setParams([]);
        setStatus(-1);
        setResponse('');
        setFetchTime(0);
        setErrorMessage('');
        setSuccessMessage('');
        setWasSuccessful(undefined);
        setSelectedEndpointIndex(-1);
        setLastFetchMethod('');
        setLastFetchUrl('');
    };
    let responseJson = undefined;
    try {
        responseJson = JSON.parse(response);
    }
    catch (e) { }
    react_1.default.useEffect(() => {
        const foundIndex = v2api_1.v2Api.findIndex((endpoint) => endpoint.endpointUrl === endpointUrl && endpoint.method === method);
        setSelectedEndpointIndex(foundIndex);
        if (foundIndex >= 0) {
            const endpoint = v2api_1.v2Api[foundIndex];
            const prevApiParams = [...params];
            const paramArray = endpoint.params.map((param) => {
                var _a;
                return { k: param.k, v: ((_a = prevApiParams.find((p) => p.k === param.k)) === null || _a === void 0 ? void 0 : _a.v) || '' };
            });
            setParams(paramArray);
            setShowParams(paramArray.length > 0);
        }
    }, [endpointUrl, method]);
    const handlePasteAccessToken = () => {
        const queryPermissions = { name: 'clipboard-read' };
        navigator.permissions.query(queryPermissions).then((result) => {
            // If permission to read the clipboard is granted or if the user will
            // be prompted to allow it, we proceed.
            if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard
                    .readText()
                    .then((text) => {
                    setAccessToken(text);
                })
                    .catch((e) => console.error(e));
            }
        });
    };
    const updateUrlParamsForEndpointUrl = (newEndpointUrl) => {
        if (newEndpointUrl) {
            const urlParamMatches = newEndpointUrl.match(/[:]\w+/g);
            if (urlParamMatches) {
                const prevUrlParams = [...urlParams];
                const urlParamArray = urlParamMatches.map((urlParam) => {
                    var _a;
                    const paramKey = urlParam.replace(/^[:]/, '');
                    return { k: paramKey, v: ((_a = prevUrlParams.find((p) => p.k === paramKey)) === null || _a === void 0 ? void 0 : _a.v) || '' };
                });
                setUrlParams(urlParamArray);
            }
            else {
                setUrlParams([]);
            }
        }
        else {
            setUrlParams([]);
        }
    };
    const urlParamElements = urlParams.map((param, index) => {
        return (react_1.default.createElement("div", { key: `url-param-${index}`, className: "d-flex align-items-center gap-1" },
            react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "Enter key name", value: urlParams[index].k, readOnly: true }),
            "=",
            react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: `Enter ${urlParams[index].k} value`, value: urlParams[index].v, required: true, inputStyle: { background: urlParams[index].v.length === 0 ? 'rgb(255, 230, 230)' : 'rgb(240, 240, 255)' }, onChange: (e) => {
                    const newParams = [...urlParams];
                    newParams[index] = Object.assign(Object.assign({}, newParams[index]), { v: e.target.value });
                    setUrlParams(newParams);
                }, onCancel: () => {
                    const newParams = [...urlParams];
                    newParams[index] = Object.assign(Object.assign({}, newParams[index]), { v: '' });
                    setUrlParams(newParams);
                } })));
    });
    const apiParamElements = params.map((param, index) => {
        return (react_1.default.createElement("div", { key: `param-${index}`, className: "d-flex align-items-center gap-1" },
            react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "Enter key name", value: params[index].k, inputStyle: params[index].k.length > 0 && params[index].v.length > 0
                    ? { background: 'rgb(240, 240, 255)' }
                    : params[index].k.length > 0 && params[index].v.length === 0
                        ? { background: 'rgb(255, 255, 240)' }
                        : undefined, onChange: (e) => {
                    const newParams = [...params];
                    newParams[index] = Object.assign(Object.assign({}, newParams[index]), { k: e.target.value });
                    setParams(newParams);
                }, onCancel: () => {
                    const newParams = [...params];
                    newParams[index] = Object.assign(Object.assign({}, newParams[index]), { k: '' });
                    setParams(newParams);
                } }),
            "=",
            react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "Enter value", value: params[index].v, inputStyle: params[index].k.length > 0 && params[index].v.length > 0
                    ? { background: 'rgb(240, 240, 255)' }
                    : params[index].k.length > 0 && params[index].v.length === 0
                        ? { background: 'rgb(255, 255, 240)' }
                        : undefined, onChange: (e) => {
                    const newParams = [...params];
                    newParams[index] = Object.assign(Object.assign({}, newParams[index]), { v: e.target.value });
                    setParams(newParams);
                }, onCancel: () => {
                    const newParams = [...params];
                    newParams[index] = Object.assign(Object.assign({}, newParams[index]), { v: '' });
                    setParams(newParams);
                } }),
            react_1.default.createElement(IconButton_1.IconButton, { icon: fa_4.FaTrashAlt, variant: "danger", onClick: () => {
                    const newParams = [...params];
                    newParams.splice(index, 1);
                    setParams(newParams);
                } })));
    });
    const endpointOptionElements = v2api_1.v2Api.map((endpoint, index) => {
        return (react_1.default.createElement("option", { key: `endpoint-${index}`, value: index },
            endpoint.method,
            ": ",
            endpoint.endpointUrl));
    });
    const sendButtonEnabled = !!method;
    const showEmptyParamsAlert = Array.isArray(params) && params.length > 0;
    return (react_1.default.createElement(react_bootstrap_3.Form, { onSubmit: (e) => {
            e.preventDefault();
            if (method === 'DELETE') {
                setShowConfirmDeleteModal(true);
            }
            else {
                handleSend();
            }
        } },
        react_1.default.createElement(react_bootstrap_1.Modal, { centered: true, show: showConfirmDeleteModal, onHide: () => setShowConfirmDeleteModal(false) },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Confirm Delete")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement("p", { className: "fw-bold fs-5" }, "Are you sure you want to delete the resource?"),
                react_1.default.createElement("p", null,
                    "Endpoint: ",
                    react_1.default.createElement("code", { className: "px-1 border border-light rounded-2" }, endpointUrl))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_3.Button, { variant: "danger", onClick: () => {
                        setShowConfirmDeleteModal(false);
                        handleSend();
                    } }, "Delete"),
                react_1.default.createElement(react_bootstrap_3.Button, { variant: "secondary", onClick: () => setShowConfirmDeleteModal(false) }, "Cancel"))),
        react_1.default.createElement(react_bootstrap_3.Stack, { gap: 2 },
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_bootstrap_3.Form.Group, { controlId: "api-root-url" },
                    react_1.default.createElement(react_bootstrap_3.Form.Label, null, "API Root URL"),
                    react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "Root URL for the Gumroad API", value: apiRoot || '', onChange: (e) => {
                            setAPIRoot(e.target.value);
                            if (typeof localStorage !== 'undefined') {
                                localStorage['gumroadAPIRoot'] = e.target.value;
                            }
                        }, onCancel: () => {
                            setAPIRoot('');
                            if (typeof localStorage !== 'undefined') {
                                delete localStorage['gumroadAPIRoot'];
                            }
                        } }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_bootstrap_3.Form.Group, { controlId: "access-token" },
                    react_1.default.createElement(react_bootstrap_3.Form.Label, { className: "d-flex align-items-center gap-2" },
                        react_1.default.createElement("div", { className: "d-flex align-items-center" },
                            react_1.default.createElement(ai_2.AiOutlineKey, { className: "fs-4 text-warning" })),
                        react_1.default.createElement("div", null, "Access Token"),
                        !accessToken && (react_1.default.createElement("div", null,
                            react_1.default.createElement("a", { href: "https://app.gumroad.com/settings/advanced#application-form", target: "_blank", rel: "noopener noreferrer" },
                                react_1.default.createElement(IconButton_1.IconButton, { icon: fa_1.FaExternalLinkAlt, variant: "link", size: "sm", end: true, className: "py-0", style: { fontSize: '80%' }, iconProps: { style: { fontSize: '80%' } } }, "Get One"))))),
                    react_1.default.createElement("div", { className: "d-flex gap-1 align-items-center position-relative" },
                        react_1.default.createElement(im_1.ImArrowRight, { className: (0, component_utils_1.combineClassNames)('position-absolute text-info', !!accessToken ? 'd-none' : undefined), style: { left: -30 } }),
                        react_1.default.createElement(react_bootstrap_3.Stack, { direction: "horizontal", gap: 1, className: "w-100" },
                            react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "Paste access token here", value: accessToken || '', required: true, onChange: (e) => {
                                    setAccessToken(e.target.value);
                                }, onCancel: () => {
                                    setAccessToken('');
                                }, autoComplete: "off" }),
                            react_1.default.createElement(IconButton_1.IconButton, { icon: fa_2.FaPaste, variant: "secondary", onClick: handlePasteAccessToken }))))),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement(react_bootstrap_3.Form.Group, { controlId: "selected-endpoint" },
                    react_1.default.createElement(react_bootstrap_3.Form.Label, { className: "d-flex align-items-center gap-2" },
                        react_1.default.createElement("div", { className: "d-flex align-items-center" },
                            react_1.default.createElement(ai_1.AiOutlineApi, { className: "fs-4 text-info" })),
                        react_1.default.createElement("div", null, "Select An Endpoint")),
                    react_1.default.createElement("div", { className: "d-flex gap-1 align-items-center position-relative" },
                        react_1.default.createElement(im_1.ImArrowRight, { className: (0, component_utils_1.combineClassNames)('position-absolute text-info', !!accessToken && selectedEndpointIndex < 0 ? undefined : 'd-none'), style: { left: -30 } }),
                        react_1.default.createElement(react_bootstrap_3.Form.Select, { value: selectedEndpointIndex, onChange: (e) => {
                                const parsedIndex = Number.parseInt(e.target.value);
                                if (!Number.isNaN(parsedIndex)) {
                                    setSelectedEndpointIndex(Number.isNaN(parsedIndex) ? -1 : parsedIndex);
                                    if (parsedIndex >= 0) {
                                        const newEndpoint = v2api_1.v2Api[parsedIndex];
                                        setEndpointUrl(newEndpoint.endpointUrl);
                                        setMethod(newEndpoint.method);
                                        setParams(newEndpoint.params);
                                        updateUrlParamsForEndpointUrl(newEndpoint.endpointUrl);
                                    }
                                }
                            } },
                            react_1.default.createElement("option", { value: -1 }, "Make a selection..."),
                            endpointOptionElements)),
                    selectedEndpoint && (react_1.default.createElement(react_bootstrap_3.Alert, { variant: "info", className: "mt-1 py-1 mb-0" }, selectedEndpoint.description)))),
            react_1.default.createElement(react_bootstrap_2.Card, null,
                react_1.default.createElement(react_bootstrap_2.Card.Header, null, "Call Configuration"),
                react_1.default.createElement(react_bootstrap_2.Card.Body, null,
                    react_1.default.createElement(react_bootstrap_3.Stack, { gap: 2 },
                        react_1.default.createElement(react_bootstrap_3.Stack, { gap: 1 },
                            react_1.default.createElement(react_bootstrap_3.Form.Group, { controlId: "endpoint-url" },
                                react_1.default.createElement(react_bootstrap_3.Form.Label, null, "Endpoint URL"),
                                react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "API endpoint e.g. /products", value: endpointUrl || '', required: true, onChange: (e) => {
                                        setEndpointUrl(e.target.value);
                                        updateUrlParamsForEndpointUrl(e.target.value);
                                    }, onCancel: () => {
                                        setEndpointUrl('');
                                        updateUrlParamsForEndpointUrl('');
                                    }, className: "font-monospace" })),
                            react_1.default.createElement(react_bootstrap_3.Stack, { gap: 1 }, urlParamElements)),
                        react_1.default.createElement(react_bootstrap_3.Accordion, null,
                            react_1.default.createElement(react_bootstrap_3.Accordion.Item, { eventKey: "0" },
                                react_1.default.createElement(react_bootstrap_3.Accordion.Header, null,
                                    react_1.default.createElement(react_bootstrap_3.Stack, { direction: "horizontal", gap: 2 },
                                        react_1.default.createElement("div", { className: "text-dark" }, "Method"),
                                        react_1.default.createElement("div", null,
                                            react_1.default.createElement(react_bootstrap_3.Badge, { bg: "info", className: "font-monospace" }, method)))),
                                react_1.default.createElement(react_bootstrap_3.Accordion.Body, null,
                                    react_1.default.createElement("div", { className: "d-flex flex-wrap align-items-center justify-content-center gap-2" },
                                        react_1.default.createElement(react_bootstrap_3.ButtonGroup, null,
                                            react_1.default.createElement(react_bootstrap_3.Button, { variant: method === 'GET' ? 'info' : 'secondary', className: method === 'GET' ? undefined : 'text-dark', onClick: () => setMethod('GET') }, "GET"),
                                            react_1.default.createElement(react_bootstrap_3.Button, { variant: method === 'POST' ? 'info' : 'secondary', className: method === 'POST' ? undefined : 'text-dark', onClick: () => setMethod('POST') }, "POST"),
                                            react_1.default.createElement(react_bootstrap_3.Button, { variant: method === 'PUT' ? 'info' : 'secondary', className: method === 'PUT' ? undefined : 'text-dark', onClick: () => setMethod('PUT') }, "PUT"),
                                            react_1.default.createElement(react_bootstrap_3.Button, { variant: method === 'DELETE' ? 'info' : 'secondary', className: method === 'DELETE' ? undefined : 'text-dark', onClick: () => setMethod('DELETE') }, "DELETE")),
                                        react_1.default.createElement(CancelableFormControl_1.CancelableFormControl, { type: "text", placeholder: "Enter method", value: method || '', className: "font-monospace", style: { width: 150 }, required: true, onChange: (e) => setMethod(e.target.value), onCancel: () => setMethod('') }))))),
                        react_1.default.createElement(react_bootstrap_3.Accordion, { activeKey: showParams ? '0' : 'none' },
                            react_1.default.createElement(react_bootstrap_3.Accordion.Item, { eventKey: "0" },
                                react_1.default.createElement(react_bootstrap_3.Accordion.Header, { onClick: () => setShowParams(!showParams) },
                                    react_1.default.createElement(react_bootstrap_3.Stack, { direction: "horizontal", gap: 2 },
                                        react_1.default.createElement("div", { className: "text-dark" }, "Params"))),
                                react_1.default.createElement(react_bootstrap_3.Accordion.Body, null,
                                    react_1.default.createElement(react_bootstrap_3.Stack, { gap: 1 },
                                        react_1.default.createElement(react_bootstrap_3.Stack, { gap: 1 }, apiParamElements),
                                        react_1.default.createElement("div", { className: (0, component_utils_1.combineClassNames)('d-flex gap-1', params.length > 0 ? 'justify-content-end' : 'justify-content-center') },
                                            react_1.default.createElement(IconButton_1.IconButton, { icon: fa_3.FaPlus, variant: "primary", onClick: () => {
                                                    setParams([...params, { k: '', v: '' }]);
                                                } }, "Add Param"),
                                            params.length > 0 && (react_1.default.createElement(react_bootstrap_3.Button, { variant: "danger", onClick: () => {
                                                    setParams([]);
                                                } }, "Delete All"))),
                                        showEmptyParamsAlert && (react_1.default.createElement(react_bootstrap_3.Alert, { variant: "info", className: "py-1 my-2 small" },
                                            "Refer to the",
                                            ' ',
                                            react_1.default.createElement("a", { href: "https://app.gumroad.com/api", target: "_blank", rel: "noopener noreferrer" },
                                                "docs ",
                                                react_1.default.createElement(fa_1.FaExternalLinkAlt, { style: { fontSize: '80%' } })),
                                            ' ',
                                            "for param specifications. Some params are optional. Empty params will not be sent."))))))))),
            react_1.default.createElement("div", { className: "d-flex justify-content-end align-items-center gap-2" },
                typeof wasSuccessful === 'boolean' && !wasSuccessful && react_1.default.createElement(react_bootstrap_3.Badge, { bg: "danger" }, "Error"),
                typeof wasSuccessful === 'boolean' && wasSuccessful && react_1.default.createElement(react_bootstrap_3.Badge, { bg: "success" }, "Success"),
                status >= 0 && react_1.default.createElement(react_bootstrap_3.Badge, { bg: `${status}`.startsWith('2') ? 'info' : 'danger' }, statusLabel),
                react_1.default.createElement(react_bootstrap_3.Button, { variant: "secondary", onClick: handleReset }, "Reset"),
                react_1.default.createElement(react_bootstrap_3.Button, { variant: "primary", type: "submit", disabled: !sendButtonEnabled }, "Send")),
            errorMessage && (react_1.default.createElement(FadeInQuick, { key: `error-alert-${fetchTime}` },
                react_1.default.createElement(react_bootstrap_3.Alert, { variant: "danger" },
                    react_1.default.createElement("p", { className: "mb-0" }, errorMessage)))),
            successMessage && (react_1.default.createElement(FadeInQuick, { key: `success-alert-${fetchTime}` },
                react_1.default.createElement(react_bootstrap_3.Alert, { variant: "success" },
                    react_1.default.createElement("p", { className: "mb-0" }, successMessage)))),
            lastFetchMethod && lastFetchUrl && (react_1.default.createElement(FadeInQuick, { key: `request-${fetchTime}` },
                react_1.default.createElement(react_bootstrap_3.Form.Label, null, "Request Sent"),
                react_1.default.createElement("div", { className: "d-flex align-items-center gap-1" },
                    react_1.default.createElement(react_bootstrap_3.Badge, { bg: "info", className: "font-monospace" }, lastFetchMethod),
                    react_1.default.createElement(react_bootstrap_3.Form.Control, { type: "text", value: lastFetchUrl, readOnly: true })))),
            responseJson && (react_1.default.createElement(FadeInQuick, { key: `contextual-results-${fetchTime}` },
                react_1.default.createElement(ContextualResults_1.ContextualResults, { json: responseJson, className: "mt-3" }))),
            responseJson && (react_1.default.createElement(FadeInQuick, { key: `structured-response-${fetchTime}`, className: "mt-3" },
                react_1.default.createElement(react_bootstrap_3.Form.Group, { controlId: "structured-response-group" },
                    react_1.default.createElement(react_bootstrap_3.Form.Label, null, "Structured Response"),
                    react_1.default.createElement("div", { className: "text-break" },
                        react_1.default.createElement(react_json_tree_1.JSONTree, { data: responseJson, theme: {
                                scheme: 'bright',
                                author: 'chris kempson (http://chriskempson.com)',
                                base00: '#000000',
                                base01: '#303030',
                                base02: '#505050',
                                base03: '#b0b0b0',
                                base04: '#d0d0d0',
                                base05: '#e0e0e0',
                                base06: '#f5f5f5',
                                base07: '#ffffff',
                                base08: '#fb0120',
                                base09: '#fc6d24',
                                base0A: '#fda331',
                                base0B: '#a1c659',
                                base0C: '#76c7b7',
                                base0D: '#6fb3d2',
                                base0E: '#d381c3',
                                base0F: '#be643c',
                            }, invertTheme: true }))))),
            response && (react_1.default.createElement(FadeInQuick, { key: `raw-response-${fetchTime}`, className: "mt-3" },
                react_1.default.createElement(react_bootstrap_3.Form.Group, { controlId: "raw-response-group" },
                    react_1.default.createElement(react_bootstrap_3.Form.Label, null, "Raw Response"),
                    react_1.default.createElement(react_bootstrap_3.Form.Control, { as: "textarea", placeholder: "Raw response will display here", rows: 10, value: response, className: "font-monospace", readOnly: true })))))));
};
exports.GumroadAPIWidget = GumroadAPIWidget;
const FadeInQuick = styled_components_1.default.div `
  & {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.381s;
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
