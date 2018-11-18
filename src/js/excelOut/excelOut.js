"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='../declarations.d.ts' />
const Excel = require("exceljs");
const path = require("path");
let count = 0;
function excelout(rawcontent) {
    let filepath = localStorage.getItem('filepath');
    let filename = `${filepath}\\test.xlsx`.split(path.sep).join('/');
    let workbook = new Excel.Workbook();
    for (let i = 0; i <= rawcontent.length - 1; i++) {
        let sheet = workbook.addWorksheet(`${i + 1}`);
        for (let j = 0; j <= rawcontent[i].length - 1; j++) {
            sheet.getColumn(j + 1).values = rawcontent[i][j];
        }
    }
    workbook.xlsx.writeFile(filename).then(function () {
        console.log('success');
    }, function (err) {
        console.log(err);
    });
}
exports.default = excelout;
