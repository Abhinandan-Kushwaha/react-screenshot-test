var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { addScreenShotToPath, generateHtmlFile } from './utils';
import { Loader, ModalBody } from './modalBody';
import * as htmlToImage from 'html-to-image';
// import html2canvas from 'html2canvas';
// const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
// const isAndroid = Platform.OS === 'android';
var screenHeight = window.innerHeight, screenWidth = window.innerWidth;
var relativePathToScreenshotTestServer = '../../../'; // since the server code will be in server.js present inside node_modules/screenshot-test-server/dist folder
export var defaultConfig = {
    path: 'ss-test',
    localhostUrl: 'http://127.0.0.1',
    port: '8080',
    batchSize: 10,
    maxWidth: 500,
    backgroundColor: 'transparent',
    showDiffInGrayScale: false,
    quality: 0.9
};
export var useScreenShotTest = function (components, screenshotConfig) {
    var _a, _b;
    var _c = screenshotConfig !== null && screenshotConfig !== void 0 ? screenshotConfig : {}, _d = _c.localhostUrl, localhostUrl = _d === void 0 ? defaultConfig.localhostUrl : _d, _e = _c.port, port = _e === void 0 ? defaultConfig.port : _e, _f = _c.batchSize, batchSize = _f === void 0 ? defaultConfig.batchSize : _f, _g = _c.maxWidth, maxWidth = _g === void 0 ? defaultConfig.maxWidth : _g, _h = _c.backgroundColor, backgroundColor = _h === void 0 ? defaultConfig.backgroundColor : _h, showDiffInGrayScale = _c.showDiffInGrayScale, _j = _c.quality, quality = _j === void 0 ? defaultConfig.quality : _j;
    var path = (_a = screenshotConfig === null || screenshotConfig === void 0 ? void 0 : screenshotConfig.path) !== null && _a !== void 0 ? _a : defaultConfig.path;
    if (path.startsWith('/') || path.startsWith('./')) {
        path = path.split('/')[1];
    }
    path = relativePathToScreenshotTestServer + path;
    var offset = useRef(0);
    var _k = __read(useState(components.slice(offset.current, batchSize)), 2), componentsCurrentlyRendered = _k[0], setComponentsCurrentlyRendered = _k[1];
    var viewShotRefs = components.map(function (_) { return useRef(null); });
    var _l = __read(useState(false), 2), loading = _l[0], setLoading = _l[1];
    var _m = __read(useState(false), 2), modalVisible = _m[0], setModalVisible = _m[1];
    var _o = __read(useState(''), 2), modalTitle = _o[0], setModalTitle = _o[1];
    var _p = __read(useState(function () { return null; }), 2), modalBody = _p[0], setModalBody = _p[1];
    var onModalDismiss = function () {
        if (loading)
            return;
        setModalVisible(false);
        setModalTitle('');
        setModalBody(function () { return null; });
    };
    var captureView = function (viewShotRefs, componentsCurrentlyRendered) {
        if (viewShotRefs[offset.current].current) {
            setModalVisible(true);
            setLoading(true);
            var ps = componentsCurrentlyRendered.map(function (component, index) { return __awaiter(void 0, void 0, void 0, function () {
                var currentViewshotRef, res, data;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            currentViewshotRef = viewShotRefs[offset.current + index].current;
                            if (!currentViewshotRef) return [3 /*break*/, 3];
                            return [4 /*yield*/, htmlToImage.toJpeg(currentViewshotRef)]; //currentViewshotRef.capture();
                        case 1:
                            res = _c.sent() //currentViewshotRef.capture();
                            ;
                            console.log('res...', res);
                            data = res.substring(res.indexOf(',') + 1);
                            console.log('data...', data);
                            // const dataUrl = canvas.toDataURL()
                            // const data = await RNFS.readFile(canvas, 'base64');
                            // console.log('data...',data)
                            return [4 /*yield*/, addScreenShotToPath(data, component.id, path, localhostUrl, port, (_b = (_a = component.showDiffInGrayScale) !== null && _a !== void 0 ? _a : showDiffInGrayScale) !== null && _b !== void 0 ? _b : defaultConfig.showDiffInGrayScale)];
                        case 2:
                            // const dataUrl = canvas.toDataURL()
                            // const data = await RNFS.readFile(canvas, 'base64');
                            // console.log('data...',data)
                            _c.sent();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            var metaData_1 = {
                port: port,
                components: components.map(function (comp) {
                    var id = comp.id, title = comp.title, _a = comp.description, description = _a === void 0 ? '' : _a, _b = comp.maxWidth, maxWidth = _b === void 0 ? 0 : _b, _c = comp.backgroundColor, backgroundColor = _c === void 0 ? '' : _c;
                    return { id: id, title: title, description: description, maxWidth: maxWidth, backgroundColor: backgroundColor };
                })
            };
            Promise.all(ps)
                .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, newOffset, newComponents, splitPath, folder_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, generateHtmlFile(path, metaData_1, localhostUrl, port, maxWidth, backgroundColor)];
                        case 1:
                            res = _a.sent();
                            setLoading(false);
                            if (res.status === 'success') {
                                newOffset = offset.current + batchSize;
                                if (newOffset < components.length) {
                                    offset.current = newOffset;
                                    newComponents = components.slice(newOffset, newOffset + batchSize);
                                    setComponentsCurrentlyRendered(newComponents);
                                    captureView(viewShotRefs, newComponents);
                                }
                                else {
                                    splitPath = path.split('/');
                                    folder_1 = splitPath[splitPath.length - 1];
                                    setModalTitle('Screenshot tests generated successfully!');
                                    setModalBody(function () { return (_jsxs("div", { children: ["Open the file", _jsx("span", __assign({ style: {
                                                    fontWeight: 'bold',
                                                    color: '#23569E'
                                                } }, { children: " ".concat(folder_1, "/test.html ") })), "in your browser to see the reports."] })); });
                                }
                            }
                            else {
                                setModalTitle('Something went wrong while generating HTML!');
                            }
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) {
                setLoading(false);
                if ((err === null || err === void 0 ? void 0 : err.message) === 'Network request failed') {
                    setModalTitle('Server NOT running!! Please start the test server');
                    setModalBody(function () { return (_jsxs(_Fragment, { children: [_jsxs("div", { children: ["1. In the", _jsx("span", __assign({ style: {
                                            fontWeight: 'bold',
                                            color: 'black'
                                        } }, { children: " package.json " })), "under", _jsx("span", __assign({ style: {
                                            fontWeight: 'bold',
                                            color: 'black'
                                        } }, { children: " \"scripts\" " })), "add-"] }), _jsxs("div", __assign({ style: {
                                    color: '#23569E',
                                    marginTop: 4,
                                    marginBottom: 4
                                } }, { children: ["\"ss-test\"", _jsx("span", __assign({ style: { color: 'brown' } }, { children: " :   \"cd ./node_modules/screenshot-test-server/dist && node server.js\"" }))] })), _jsxs("div", __assign({ style: { marginTop: 6 } }, { children: ["2. Run the command-", _jsx("span", __assign({ style: {
                                            fontWeight: 'bold',
                                            color: 'black'
                                        } }, { children: " \"npm run ss-test\" " }))] })), _jsx("div", __assign({ style: { marginTop: 6 } }, { children: "3. Press the \"Capture and Compare\" button again." }))] })); });
                }
                else {
                    setModalTitle('Something went wrong!');
                }
            });
        }
    };
    return (_jsxs("div", __assign({ style: {
            flex: 1,
            height: screenHeight,
            backgroundColor: '#aaa',
            position: 'relative'
        } }, { children: [_jsxs("div", __assign({ style: {
                    borderWidth: 2,
                    borderRadius: 4,
                    padding: 8,
                    margin: 6,
                    maxHeight: screenHeight - 85,
                    backgroundColor: (_b = screenshotConfig === null || screenshotConfig === void 0 ? void 0 : screenshotConfig.backgroundColor) !== null && _b !== void 0 ? _b : 'white'
                } }, { children: [_jsx("span", { children: "Rendering items from ".concat(offset.current, " to ").concat(offset.current + batchSize) }), _jsx("div", __assign({ style: {
                            height: screenHeight - 145,
                            overflow: 'scroll',
                            margin: 6,
                            padding: 8,
                            borderWidth: 2,
                            borderStyle: 'solid',
                            borderColor: 'gray',
                            borderRadius: 4
                        } }, { children: __spreadArray([], __read(componentsCurrentlyRendered), false).map(function (comp, index) {
                            console.log('viewShotRefs[offset.current + index]', viewShotRefs[offset.current + index].offsetWidth);
                            return (_jsx("div", __assign({ ref: viewShotRefs[offset.current + index], style: { width: 'max-content' } }, { children: comp.component() }), comp.id));
                        }) }))] })), _jsx("div", __assign({ onClick: function () { return captureView(viewShotRefs, componentsCurrentlyRendered); }, style: {
                    borderRadius: 4,
                    backgroundColor: '#111',
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: -16,
                    marginLeft: (screenWidth - 240) / 2,
                    maxWidth: 220,
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderColor: 'lightgray',
                    borderWidth: 2,
                    borderStyle: 'solid'
                } }, { children: _jsx("div", __assign({ style: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textAlign: 'center'
                    } }, { children: "Capture and Compare" })) })), modalVisible ? (_jsx("div", __assign({ 
                // activeOpacity={1}
                onClick: onModalDismiss, style: {
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: screenWidth,
                    height: screenHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 0
                } }, { children: loading ? (_jsx(Loader, { offset: offset.current, batchSize: batchSize })) : (_jsx(ModalBody, { title: modalTitle, body: modalBody, onDismiss: onModalDismiss })) }))) : null] })));
};
//# sourceMappingURL=withShot.js.map