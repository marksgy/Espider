"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = document.getElementById('progress');
const title = 'Working on it\n';
let count = 0;
function progress() {
    count++;
    let str = `${title}${count} pages`;
    a.innerText = str;
}
exports.progress = progress;
function end() {
    count = 0;
    a.innerText = 'Done!';
}
exports.end = end;
