"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
function mainicp(mainWindow) {
    let newwin;
    electron_1.ipcMain.on('targetPage', (e, arg) => {
        newwin = new electron_1.BrowserWindow({
            width: 1280,
            height: 768,
            frame: true,
            parent: mainWindow,
            webPreferences: {
                preload: path.join(__dirname, '../pageSelection/pageSelection.js'),
                allowRunningInsecureContent: true,
                contextIsolation: true
            }
        });
        newwin.loadURL(arg); //new.html是新开窗口的渲染进程
        newwin.on('closed', () => {
            newwin = null;
            mainWindow.webContents.send('closesub');
        });
        // newwin.webContents.openDevTools();
    });
    electron_1.ipcMain.on('arrchange', (e, arg) => {
        mainWindow.webContents.send('arrchanged', arg);
    });
}
exports.default = mainicp;
