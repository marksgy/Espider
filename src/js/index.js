"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const mainIcp_1 = require("./newWindow/mainIcp");
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({ width: 800, height: 600, frame: false });
    // and load the index.html of the app.
    mainWindow.loadFile('../html/index.html');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // Emitted when the window is closed. 
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    mainIcp_1.default(mainWindow);
}
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//fuck
