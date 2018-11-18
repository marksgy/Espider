"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
var mycolor = 'rgba(141, 214, 249, 0.35)';
var entryobj = {};
var entry = [];
Object.defineProperty(entryobj, "entry", {
    set: function (value) {
        entry = value;
        electron_1.ipcRenderer.send('arrchange', entry);
    },
    get: function () {
        return entry;
    }
});
var newentry = [];
var obj = {};
let color = '';
let setcolor = '';
let flag = true;
let item = {};
let parent = {};
let isfirst = true;
process.once('loaded', () => {
    // global.entry = entry;
});
window.addEventListener('mousedown', (e) => {
    if (e.which == 1) {
        addToList(e.target);
    }
    if (e.which == 3) {
        deleteFromList(e.target);
    }
});
window.addEventListener('mouseover', (e) => {
    changecolor(e.target);
});
window.addEventListener('mouseout', (e) => {
    // changecolor(e.target, true, false);
    changecolor(e.target);
});
function addToList(target) {
    color = mycolor;
    isfirst = true;
    obj = { finder: '', item: [] };
    getOnlyWay(target);
    let isin = false;
    for (let i in entry) {
        //可能有问题
        if (entry[i].finder == obj.finder && contains(entry[i].item, obj.item)) {
            isin = true;
        }
    }
    if (!isin) {
        newentry = entry;
        newentry.push(obj);
        entryobj.entry = newentry;
    }
}
function deleteFromList(target) {
    color = '';
    flag = false;
    // changecolor(target, false);
    changecolor(target);
    color = '';
    flag = false;
    obj = { finder: '', item: [] };
    getOnlyWay(target);
    // let classname = target.className;
    // let tagname = target.tagName;
    // let thisname = '';
    // if (classname != '') {
    //     thisname = `.${classname}`;
    // } else {
    //     thisname = tagname;
    // }
    newentry = [];
    for (let i of entry) {
        //可能有问题!!!!!!!!!!!!!!
        if (i.finder == obj.finder && contains(i.item, obj.item)) {
            continue;
        }
        else {
            newentry.push(i);
        }
        console.log(newentry);
    }
    entryobj.entry = newentry;
}
function contains(arr, arr2) {
    let isin1 = true;
    let isin2 = true;
    for (let i of arr) {
        if (i in arr2) {
            isin1 = false;
        }
    }
    for (let i of arr2) {
        if (i in arr) {
            isin2 = false;
        }
    }
    return (isin1 || isin2);
}
function handleclassname(clsname) {
    let arr = [];
    let tmp = clsname.trim().split(' ');
    tmp.forEach(element => {
        if (element != "") {
            arr.push(element);
        }
    });
    return arr.join('.');
}
function getOnlyWay(target) {
    if (target.className != '') {
        let classname = handleclassname(target.className);
        console.log(classname);
        if (document.querySelectorAll(`.${classname}`).length == 1) {
            obj.finder = `.${classname}`;
            return;
        }
    }
    if (target.id != '') {
        if (target.className == '' || document.querySelectorAll(`.${target.className}`).length == 1) {
            obj.finder = `#${target.id}`;
            return;
        }
    }
    if (document.querySelectorAll(`${target.tagName}`).length == 1) {
        obj.finder = target.tagName;
        return;
    }
    if (isfirst) {
        if (target.className != '') {
            let classname = handleclassname(target.className);
            obj.item.push(`.${classname}`);
        }
        else {
            obj.item.push(`${target.tagName}`);
        }
        isfirst = false;
    }
    parent.className = handleclassname(target.parentNode.className);
    parent.tagName = target.parentNode.tagName;
    parent.id = target.parentNode.id;
    if (parent.className != '') {
        if (document.querySelectorAll(`.${parent.className}`).length == 1) {
            obj.finder = `.${parent.className}`;
            return;
        }
        obj.item.push(`.${parent.className}`);
    }
    else if (parent.id != '') {
        if (parent.className == '' || document.querySelectorAll(`.${parent.className}`).length == 1) {
            obj.finder = `#${parent.id}`;
            return;
        }
        obj.item.push(`#${parent.id}`);
    }
    else if (document.querySelectorAll(`${parent.tagName}`).length == 1) {
        obj.finder = parent.tagName;
        return;
    }
    else {
        obj.item.push(parent.tagName);
    }
    getOnlyWay(target.parentNode);
}
function changecolor(target) {
    obj = { finder: '', item: [] };
    isfirst = true;
    getOnlyWay(target);
    if (flag) {
        color = target.style.background;
        setcolor = mycolor;
        flag = false;
    }
    else {
        setcolor = color;
        flag = true;
    }
    let tmp = [];
    let parent = document.querySelector(obj.finder);
    for (let i = obj.item.length - 1; i >= 0; i--) {
        tmp = [];
        if (Array.isArray(parent)) {
            for (let j of parent) {
                let w = j.querySelectorAll(obj.item[i]);
                for (let t of w) {
                    tmp.push(t);
                }
            }
        }
        else {
            parent = parent.querySelectorAll(obj.item[i]);
            for (let j of parent) {
                tmp.push(j);
            }
        }
        parent = tmp;
    }
    if (!Array.isArray(parent)) {
        tmp = parent;
        parent = [];
        parent.push(tmp);
    }
    for (let i of parent) {
        i.style.background = setcolor;
    }
}
