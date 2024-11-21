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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export var ModalBody = function (props) {
    var title = props.title, body = props.body, onDismiss = props.onDismiss;
    return (_jsxs("div", __assign({ style: {
            margin: 15,
            backgroundColor: 'white',
            opacity: 0.9,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: 'gray',
            padding: 20,
        } }, { children: [_jsx("div", __assign({ style: { fontSize: 20, fontWeight: 'bold', color: 'black' } }, { children: title })), _jsx("div", __assign({ style: { marginTop: 20 } }, { children: body !== null && body !== void 0 ? body : null })), _jsx("div", __assign({ onClick: onDismiss, style: { alignSelf: 'flex-end', marginTop: 16 } }, { children: _jsx("div", __assign({ style: { color: '#23569E', fontWeight: 'bold', fontSize: 16 } }, { children: "OK" })) }))] })));
};
export var Loader = function (_a) {
    var offset = _a.offset, batchSize = _a.batchSize;
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ style: styles.container }, { children: _jsxs("div", __assign({ style: { color: 'gray', margin: 10 } }, { children: ["Generating the tests for components", _jsx("span", __assign({ style: { fontWeight: 'bold', color: 'black' } }, { children: ":  ".concat(offset, " to ").concat(offset + batchSize) }))] })) })) }));
};
var styles = {
    container: {
        margin: 15,
        backgroundColor: 'white',
        opacity: 0.9,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        padding: 20,
    },
};
//# sourceMappingURL=modalBody.js.map