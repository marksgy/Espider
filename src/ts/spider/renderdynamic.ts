import * as jsdom from "jsdom";
const { JSDOM } = jsdom;
import * as faker from 'faker';
import hrefparse from './hrefparse';
import pageObj from '../interfaces/pageObj';
import out from '../excelOut/out';
import {progress,end} from '../viewBind/progress';

function getconfig(fake:any){
    return{runScripts:"dangerously",resources: "usable",userAgent:fake.internet.userAgent() };
}

function purlselectionminor(i:pageObj,dom:any,resolve:any){
    let tmp:string[]=[];
    try{
        for (let ent of i.entry){
            let finder=dom.window.document.querySelector(ent.finder);
            let derfin:any=[]; 
            
            if(!ent.item){
                let attr=finder.href;
                attr=hrefparse(i.url,attr);
                tmp.push(attr);
                
            }else{
                for(let i=ent.item.length-1;i>=0;i--){
                    if(finder.length>1){
                            derfin=[];
                            finder.forEach((e:any)=>{
                                derfin.push(e.querySelector(ent.item[i]));
                            })
                        finder=derfin;
                    }else{
                        finder=finder.querySelectorAll(ent.item[i]);
                    }
                }
                
                finder.forEach((e:any)=>{
                    let attr=e.href;

                    if(attr!=undefined){
                        attr=hrefparse(i.url,attr);
                        tmp.push(attr);
                    }
                    
                });
                
            }
    
        }
        resolve(tmp);
    }catch(e){
        process.nextTick(()=>purlselectionminor(i,dom,resolve));
    }
}
function purlselection(i:pageObj,resolve:any){
    JSDOM.fromURL(i.url, getconfig(faker)).then((dom:any) => {
        purlselectionminor(i,dom,resolve);
    });              
}

function entryselectionminor(i:pageObj,dom:any,resolve:any){
    let tmp:string[]=[];
    try{
        for (let ent of i.entry){
            let finder=dom.window.document.querySelector(ent.finder);
            let derfin:any=[]; 
            
            if(!ent.item){
                let attr=finder.href;
                attr=hrefparse(i.url,attr);
                tmp.push(attr);
             
            }else{
                for(let i=ent.item.length-1;i>=0;i--){
                    if(finder.length>1){
                        
                            derfin=[];
                            finder.forEach((e:any)=>{
                                derfin.push(e.querySelector(ent.item[i]));
                                
                            })
                        
                        
                        finder=derfin;
                    }else{
                        finder=finder.querySelectorAll(ent.item[i]);
                   
                    }
                    
                }
                
                finder.forEach((e:any)=>{
                    let attr=e.href;
                    if(attr!=undefined){
                        attr=hrefparse(i.url,attr);
                        tmp.push(attr);
                    }
                    
                });
                
            }
        }
    
        
        resolve(tmp);
    }catch(e){
        process.nextTick(()=>entryselectionminor(i,dom,resolve));
    } 

}

function entryselection(i:pageObj,j:string,resolve:any){
    JSDOM.fromURL(j, getconfig(faker)).then((dom:any) => {
        entryselectionminor(i,dom,resolve);
    }); 
}

function contentselectionminor(i:pageObj,dom:any,resolve:any){
    let tmp=[];
    try{
            let tmpminor:any=[];
            for (let ent of i.entry){
                let derfin:any=[]; 
                tmpminor=[];
                let finder=dom.window.document.querySelector(ent.finder);
                
                if(!ent.item){
                    tmpminor.push(finder.innerText.trim().trim()+'\n');
                   
                }else{
                    for(let i=ent.item.length-1;i>=0;i--){
                        if(finder.length>1){
                            
                                derfin=[];
                                finder.forEach((e:any)=>{
                                    derfin.push(e.querySelector(ent.item[i]));
                                    
                                })
                            
                            
                            finder=derfin;
                        }else{
                            finder=finder.querySelectorAll(ent.item[i]);
                       
                        }
                        
                    }

                    finder.forEach((e:any)=>{
                        let attr=e.innerText.trim().trim()+'\n';
                        if(attr!=undefined){
                            tmpminor.push(e.trim().trim()+'\n');
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
            progress();
            resolve(tmp);
        
    }catch(e){
        process.nextTick(()=>contentselectionminor(i,dom,resolve));
    }
}

function contentselection(i:pageObj,j:string,resolve:any){
    JSDOM.fromURL(j, getconfig(faker)).then((dom:any) => {
        contentselectionminor(i,dom,resolve);
    }); 
}


async function renderdynamic(arr:pageObj[]){
    let purl:any=[];
    let entryurl:any=[];
    let rawcontent:any=[];
    for(let i of arr){
        if(i.type==1){
            
            purl=await new Promise((resolve)=>{
                purlselection(i,resolve);
            })
            
        }else if(i.type==2){
            if(purl.length==0){
                purl.push(i.url);
            }
            for(let j of purl){
                let tmpentryurl:any=await new Promise((resolve)=>{
                    entryselection(i,j,resolve);
                })
                entryurl.push(...tmpentryurl);
            }

        }else if(i.type==3){
            if(entryurl.length==0){
                entryurl.push(i.url);
            }
            for(let j of entryurl){
                let tmpcontent=await new Promise((resolve)=>{
                    contentselection(i,j,resolve);
                })
                rawcontent.push(tmpcontent);
            }
            
            
           
        }
        
    }
    let outputType=localStorage.getItem('outputType');
    end();
    out(rawcontent,outputType);

}



export default renderdynamic;