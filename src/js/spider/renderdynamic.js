"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const faker = require("faker");
const hrefparse_1 = require("./hrefparse");
const out_1 = require("../excelOut/out");
const progress_1 = require("../viewBind/progress");
function getconfig(fake) {
    return { runScripts: "dangerously", resources: "usable", userAgent: fake.internet.userAgent() };
}
function purlselectionminor(i, dom, resolve) {
    let tmp = [];
    try {
        for (let ent of i.entry) {
            let finder = dom.window.document.querySelector(ent.finder);
            let derfin = [];
            if (!ent.item) {
                let attr = finder.href;
                attr = hrefparse_1.default(i.url, attr);
                tmp.push(attr);
            }
            else {
                for (let i = ent.item.length - 1; i >= 0; i--) {
                    if (finder.length > 1) {
                        derfin = [];
                        finder.forEach((e) => {
                            derfin.push(e.querySelector(ent.item[i]));
                        });
                        finder = derfin;
                    }
                    else {
                        finder = finder.querySelectorAll(ent.item[i]);
                    }
                }
                finder.forEach((e) => {
                    let attr = e.href;
                    if (attr != undefined) {
                        attr = hrefparse_1.default(i.url, attr);
                        tmp.push(attr);
                    }
                });
            }
        }
        resolve(tmp);
    }
    catch (e) {
        process.nextTick(() => purlselectionminor(i, dom, resolve));
    }
}
function purlselection(i, resolve) {
    JSDOM.fromURL(i.url, getconfig(faker)).then((dom) => {
        purlselectionminor(i, dom, resolve);
    });
}
function entryselectionminor(i, dom, resolve) {
    let tmp = [];
    try {
        for (let ent of i.entry) {
            let finder = dom.window.document.querySelector(ent.finder);
            let derfin = [];
            if (!ent.item) {
                let attr = finder.href;
                attr = hrefparse_1.default(i.url, attr);
                tmp.push(attr);
            }
            else {
                for (let i = ent.item.length - 1; i >= 0; i--) {
                    if (finder.length > 1) {
                        derfin = [];
                        finder.forEach((e) => {
                            derfin.push(e.querySelector(ent.item[i]));
                        });
                        finder = derfin;
                    }
                    else {
                        finder = finder.querySelectorAll(ent.item[i]);
                    }
                }
                finder.forEach((e) => {
                    let attr = e.href;
                    if (attr != undefined) {
                        attr = hrefparse_1.default(i.url, attr);
                        tmp.push(attr);
                    }
                });
            }
        }
        resolve(tmp);
    }
    catch (e) {
        process.nextTick(() => entryselectionminor(i, dom, resolve));
    }
}
function entryselection(i, j, resolve) {
    JSDOM.fromURL(j, getconfig(faker)).then((dom) => {
        entryselectionminor(i, dom, resolve);
    });
}
function contentselectionminor(i, dom, resolve) {
    let tmp = [];
    try {
        let tmpminor = [];
        for (let ent of i.entry) {
            let derfin = [];
            tmpminor = [];
            let finder = dom.window.document.querySelector(ent.finder);
            if (!ent.item) {
                tmpminor.push(finder.innerText.trim().trim() + '\n');
            }
            else {
                for (let i = ent.item.length - 1; i >= 0; i--) {
                    if (finder.length > 1) {
                        derfin = [];
                        finder.forEach((e) => {
                            derfin.push(e.querySelector(ent.item[i]));
                        });
                        finder = derfin;
                    }
                    else {
                        finder = finder.querySelectorAll(ent.item[i]);
                    }
                }
                finder.forEach((e) => {
                    let attr = e.innerText.trim().trim() + '\n';
                    if (attr != undefined) {
                        tmpminor.push(e.trim().trim() + '\n');
                    }
                });
            }
            tmp.push(tmpminor);
        }
        // for(let i of tmp){
        //     fs.writeFile(_path, i, { 'flag': 'a' },function (err) {
        //         if (!err)
        //           console.log("写入成功！")
        //       })
        // }
        progress_1.progress();
        resolve(tmp);
    }
    catch (e) {
        process.nextTick(() => contentselectionminor(i, dom, resolve));
    }
}
function contentselection(i, j, resolve) {
    JSDOM.fromURL(j, getconfig(faker)).then((dom) => {
        contentselectionminor(i, dom, resolve);
    });
}
async function renderdynamic(arr) {
    let purl = [];
    let entryurl = [];
    let rawcontent = [];
    for (let i of arr) {
        if (i.type == 1) {
            purl = await new Promise((resolve) => {
                purlselection(i, resolve);
            });
        }
        else if (i.type == 2) {
            if (purl.length == 0) {
                purl.push(i.url);
            }
            for (let j of purl) {
                let tmpentryurl = await new Promise((resolve) => {
                    entryselection(i, j, resolve);
                });
                entryurl.push(...tmpentryurl);
            }
        }
        else if (i.type == 3) {
            if (entryurl.length == 0) {
                entryurl.push(i.url);
            }
            for (let j of entryurl) {
                let tmpcontent = await new Promise((resolve) => {
                    contentselection(i, j, resolve);
                });
                rawcontent.push(tmpcontent);
            }
        }
    }
    let outputType = localStorage.getItem('outputType');
    progress_1.end();
    out_1.default(rawcontent, outputType);
}
exports.default = renderdynamic;
