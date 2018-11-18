"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function headerBind(header, allpage) {
    //处理自定义顶栏
    const win = require('electron').remote.getCurrentWindow();
    menubind(header.espider, allpage);
    devtoolbind(header.devTool);
    excelbind(header.excel)();
    minbind(header.headerMin, win);
    maxbind(header.headerMax, win)();
    crossbind(header.headerCross, win);
}
function menubind(epider, allpage) {
    epider.onclick = () => {
        if (allpage.length == 0) {
            alert('请输入网址');
        }
        else {
            Promise.resolve().then(() => require('../spider/espider')).then(render => {
                render.default(allpage);
            })
                .catch(error => {
                console.log(error);
            });
        }
    };
}
function devtoolbind(devtool) {
    devtool.onclick = () => {
        electron_1.shell.openExternal("https://github.com/marksgy/Espider");
    };
}
function excelbind(excel) {
    // let selected = false;
    return () => {
        excel.onclick = () => {
            // if(!selected){
            document.getElementById('setting').classList.add("setting-active");
            //     selected=true;
            // }else{
            //     document.getElementById('setting').classList.remove("setting-active");
            //     selected=false;
            // }
        };
    };
}
function minbind(min, win) {
    min.onclick = () => {
        win.minimize();
    };
}
function maxbind(max, win) {
    let ismax = false;
    let hmaxmax = max.querySelector('.hmaxmax');
    let hmaxmin = max.querySelector('.hmaxmin');
    win.on('maximize', () => {
        ismax = true;
        hmaxmax.style.display = 'none';
        hmaxmin.style.display = 'inline';
    });
    win.on('unmaximize', () => {
        ismax = false;
        hmaxmin.style.display = 'none';
        hmaxmax.style.display = 'inline';
    });
    return () => {
        max.onclick = () => {
            if (ismax) {
                win.unmaximize();
                hmaxmin.style.display = 'none';
                hmaxmax.style.display = 'inline';
                ismax = false;
            }
            else {
                win.maximize();
                hmaxmax.style.display = 'none';
                hmaxmin.style.display = 'inline';
                ismax = true;
            }
        };
    };
}
function crossbind(cross, win) {
    cross.onclick = () => {
        win.close();
    };
}
exports.default = headerBind;
