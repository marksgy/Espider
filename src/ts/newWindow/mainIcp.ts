import {BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';

function mainicp(mainWindow:BrowserWindow):void {
    let newwin:BrowserWindow;
    ipcMain.on('targetPage', (e:Error, arg:string) => {
        newwin = new BrowserWindow({
            width: 1280,
            height: 768,
            frame: true,
            parent: mainWindow, //win是主窗口
            webPreferences: {
                preload: path.join(__dirname, '../pageSelection/pageSelection.js'),
                allowRunningInsecureContent:true,
                contextIsolation :true
            }
        })
        newwin.loadURL(arg); //new.html是新开窗口的渲染进程
        newwin.on('closed', () => {
            newwin = null;
            mainWindow.webContents.send('closesub');
        })
        // newwin.webContents.openDevTools();
    });

    ipcMain.on('arrchange', (e:Error, arg:string) => {
        mainWindow.webContents.send('arrchanged', arg);
        
    });
}

export default mainicp
