"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excelOut_1 = require("./excelOut");
const txtOut_1 = require("./txtOut");
function Outt(rawcontent, type) {
    if (type == "txt") {
        txtOut_1.default(rawcontent);
    }
    else if (type == "excel") {
        excelOut_1.default(rawcontent);
    }
}
exports.default = Outt;
