
import * as fs from "fs"
import * as paa from 'path'

import {plugConfig} from './plugInterface'



let plugList:string[]=[];   //包含所有plugin的名字
let plugMap:Map<string,string[]>=new Map();     //包含所有plugin和其地址


let plugTree:Map<string,any>=new Map();//名字和函数

let plugPath=paa.resolve(__dirname,'../plug');//插件文件夹路径
let plugConfig=paa.resolve(plugPath, './plugConfig.json');          //plug配置文件


//理论上说我应该检查插件间的数据是否匹配，但算了吧。

function plugInit(){
    plugRead();
    // bind();
}

//获取插件的name和path
function plugRead(){
    let config=fs.readFileSync(plugConfig,'utf8');
    let json:plugConfig=JSON.parse(config);

    plugList=json.plugList;

    for(let i of json.plugMap){
        plugMap.set(i.name,[i.type,i.path]);
    }
}

// both python and javascript or others remained to be written
function plugLoad(name:string){
    let plug=plugMap.get(name);
    if(plug==undefined){
        throw 'ERR::No such plugin.';
    }
        
    let type=plug[0];
    let path=plug[1];
    if(type=="javascript"){
        jsPlug(name,path);
    }else if(type=="python"){
        pythonPlug(name,path);
    }
}




function jsPlug(name:string,path:string){
    let plug=require(paa.resolve(plugPath,path));
    plugTree.set(name,plug);
}

function pythonPlug(name:string,path:string){

}


function changeConfigPath(){

}

// function bind(){
//     let button=document.getElementById('fuck');
//     button.onclick=function(){
//         plugLoad('fuck');
//         plugTree.get('fuck').fuck();
//     };
    
// }


plugInit();