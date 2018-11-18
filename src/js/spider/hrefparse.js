"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hrefparse(mainhref, href) {
    if (href.indexOf('http') == -1) {
        if (href.indexOf('/') != 0) {
            href = '/' + href;
        }
        return mainhref.slice(0, mainhref.indexOf('/', 8)) + href;
    }
    return href;
}
exports.default = hrefparse;
