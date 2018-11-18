"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function txtOut(rawcontent) {
    let filepath = localStorage.getItem('filepath');
    let filename = path.resolve(filepath).split(path.sep).join('/');
    // fs.exists(filename,(b)=>{
    //     if(!b){
    //         fs.mkdir(filename)
    //     }
    // })
    for (let i = 0; i <= rawcontent.length - 1; i++) {
        let thisname = `${filename}/${i}.txt`;
        console.log(thisname);
        for (let j = 0; j <= rawcontent[i].length - 1; j++) {
            fs.writeFile(thisname, `${rawcontent[i][j]}\n`, { 'flag': 'a' }, function (err) {
                if (err)
                    console.log(err);
            });
        }
    }
}
exports.default = txtOut;
