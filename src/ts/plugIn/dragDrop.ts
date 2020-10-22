import { IpcMain } from 'electron';
import {unCompress} from './unCompress'
import {plugPath,plugAdd} from './plugInit'
import * as paa from 'path'

function dragDrop(ipc:IpcMain){
    ipc.on('dragDropPlug',(event,path)=>{
        //从drag&drop获取路径
        //代码提示
        // document.ondragover = document.ondrop = (ev) => {
        //     ev.preventDefault()
        //   }
          
        //   document.body.ondrop = (ev) => {
        //     console.log(ev.dataTransfer.files[0].path)
        //     ev.preventDefault()
        //   }

        
        unCompress(path,plugPath);
        //plugin的真实路径
        let realPath=paa.resolve(plugPath,paa.basename(path).split('.')[0]);
        plugAdd(realPath);

    })
}

export {dragDrop}