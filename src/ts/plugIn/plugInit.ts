
import * as fs from "fs"
import * as paa from 'path'

import {plugConfig,plugMap} from './plugInterface'



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
    let path=paa.resolve(`./${name}`,plug[1]);
    if(type.toLocaleLowerCase()=="javascript".toLocaleLowerCase()){
        jsPlug(name,path);
    }else if(type.toLocaleLowerCase()=="python".toLocaleLowerCase()){
        pythonPlug(name,path);
    }
}




function jsPlug(name:string,path:string){
    let plug=require(paa.resolve(plugPath,path));
    plugTree.set(name,plug);
}

function pythonPlug(name:string,path:string){

}

//注册插件到plugConfig.json
function plugAdd(from:string){
    let config;
    try{
        config=fs.readFileSync(paa.resolve(from,'plugConfig.json'),'utf8');
    }catch{
        throw 'Invalid Plugin:: Missing \'plugConfig.json\'';
        
    }
    
    let json:plugMap=JSON.parse(config);

    
    let Gconfig=fs.readFileSync(plugConfig,'utf8');
    let Gjson:plugConfig=JSON.parse(Gconfig);

    Gjson.plugMap.push(json);
    plugMap.set(json.name,[json.type,json.path]);

    
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




export {plugLoad, plugPath,plugAdd};