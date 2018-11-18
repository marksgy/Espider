///<reference path='../declarations.d.ts' />
import * as cheerio from 'cheerio';
import * as request from 'superagent';
import * as superagentc from 'superagent-charset';
import * as faker from 'faker';
import * as path from 'path';
import pageObj from '../interfaces/pageObj';
import out from '../excelOut/out';
import blur from './blur';
import hrefparse from './hrefparse';
import {progress,end} from '../viewBind/progress';


const superagent=superagentc(request);




let TIME=parseInt(localStorage.getItem('interval'))*1000;
let pageurl = [];
// var titleurl=[];
let count = 0;
let filename = '';
let _path = path.join(__dirname, `./fuck/${count}.txt`);
let encoding="";


function render(arr:pageObj[]) {
    renderstatic(arr).catch((e) => {
        console.log(e);
        import('./renderdynamic')
                .then(renderdynamic => {
                    renderdynamic.default(arr);
                })
                .catch(error => {
                    let a=document.getElementById('progress');
                    a.innerText="Error occurred";
                    console.log(error);
                })
        
        // import(/* webpackChunkName: "renderDynamic" */'./renderDynamic')
        //     .then(renderdynamic => {
        //         renderdynamic(arr);
        //     })
        //     .catch(error => {
        //         /* Error handling */
        //         console.log(e);
        //     })
        // console.log(e);
    })


}

function purlselection(i:pageObj, resolve:any, reject:any) {

    let tmp:string[] = [];
    superagent
        .get(i.url)
        .set({'User-Agent': faker.internet.userAgent()})
        .charset(encoding)
        .end((err:any, res:any) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            try {
                let $ = cheerio.load(res.text);


                for (let ent of i.entry) {
                    let finder = $(ent.finder);
                    let derfin:any = [];

                    if (!ent.item) {
                        let attr = finder.attr("href");
                        attr = hrefparse(i.url, attr);
                        tmp.push(attr);

                    } else {
                        let hashref=false;
                        for (let i = ent.item.length - 1; i >= 0; i--) {
                            if (finder.length > 1) {
                                if (Array.isArray(finder)) {
                                    derfin = [];
                                    hashref=hashreff(finder[0].attr("href"));   
                                    finder.forEach((e) => {
                                        
                                        derfin.push(e.find(ent.item[i]));

                                    })
                                    if(hashref){
                                        break;
                                    }
                                } else {
                                    derfin = [];
                                    hashref=hashreff(finder[0].attr("href"));   
                                    finder.each(function () {
                                        // console.log($(this).find((ent.item[i])))
                                        derfin.push($(this).find(ent.item[i]));

                                    });
                                    if(hashref){
                                        break;
                                    }
                                }

                                finder = derfin;
                            } else {
                                finder = finder.find(ent.item[i]);

                            }

                        }

                        finder.forEach((e:any) => {
                            let attr = e.attr("href");

                            if (attr != undefined) {
                                attr = hrefparse(i.url, attr);
                                tmp.push(attr);
                            }

                        });
                        

                    }

                }
                resolve(tmp);
            } catch (e) {
                
                reject(e);
            }

        })


}

function entryselection(i:pageObj, j:string, resolve:any, reject:any) {

    let tmp:any = [];

    superagent
        .get(j)
        .set({'User-Agent': faker.internet.userAgent()})
        .charset(encoding)
        .end((err:any, res:any) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            try {
                let $ = cheerio.load(res.text);

                for (let ent of i.entry) {
                    let finder = $(ent.finder);
                    console.log(finder)
                    let derfin:any = [];

                    if (!ent.item) {
                        let attr = finder.attr("href");
                        attr = hrefparse(i.url, attr);
                        tmp.push(attr);

                    } else {
                        let hashref=false;
                        for (let i = ent.item.length - 1; i >= 0; i--) {
                            if (finder.length > 1) {
                                if (Array.isArray(finder)) {
                                    derfin = [];
                                    hashref=hashreff(finder[0].attr("href"));   
                                    finder.forEach((e) => {
                                        derfin.push(e.find(ent.item[i]));

                                    })
                                    if(hashref){
                                        break;
                                    }
                                } else {
                                    derfin = [];
                                    hashref=hashreff(finder[0].attr("href"));   
                                    finder.each(function () {
                                        // console.log($(this).find((ent.item[i])))
                                        derfin.push($(this).find(ent.item[i]));

                                    });
                                    if(hashref){
                                        break;
                                    }
                                }

                                finder = derfin;
                            } else {
                                finder = finder.find(ent.item[i]);
                                if (!Array.isArray(finder)){
                                    derfin=[];
                                    finder.each(function () {
                                        // console.log($(this).find((ent.item[i])))
                                        derfin.push($(this));

                                    });
                                    finder=derfin;
                                    console.log(finder);
                                }
                            }

                        }

                        
                        finder.forEach((e:any) => {
                            let attr = e.attr("href");

                            if (attr != undefined) {
                                
                                attr = hrefparse(i.url, attr);
                                tmp.push(attr);
                            }

                        });

                    }

                }
                console.log(tmp);
                resolve(tmp);
            } catch (e) {
                reject(e);
            }


        })

}

function contentselection(i:pageObj, j:string, resolve:any, reject:any) {
    let tmp:any = [];
    
    superagent
        .get(j)
        .set({'User-Agent': faker.internet.userAgent()})
        .charset(encoding)
        .end((err:any, res:any) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            try {
                // console.log(res);

                let $ = cheerio.load(res.text);
                // console.log($);
                let tmpminor:any = [];
                for (let ent of i.entry) {
                    tmpminor = [];
                    let derfin:any = [];


                    let finder = $(ent.finder);

                    if(finder.length==0){
                        console.log('blur')
                        let blurfinder=blur(ent.finder);
                        for(let i of blurfinder){
                            finder=$(i);
                            if(finder.length==1){
                                break;
                            }
                        }
                        
                    }
                    
                    
                    if (!ent.item) {
                        tmpminor.push(finder.text().trim().trim() + '\n');

                    } else {
                        for (let i = ent.item.length - 1; i >= 0; i--) {
                            if (finder.length > 1) {
                                if (Array.isArray(finder)) {
                                    console.log(finder);
                                    derfin = [];
                                    finder.forEach((e) => {
                                        derfin.push(e.find(ent.item[i]));

                                    })
                                } else {
                                    derfin = [];
                                    finder.each(function () {
                                        // console.log($(this).find((ent.item[i])))
                                        derfin.push($(this).find(ent.item[i]));

                                    });
                                }

                                finder = derfin;
                            } else {
                                finder = finder.find(ent.item[i]);

                            }

                        }

                        if (Array.isArray(finder)) {
                            finder.forEach((e) => {
                                tmpminor.push(e.text().trim().trim() + '\n');
                            });
                        } else {
                            finder.each(function () {
                                // console.log($(this).find((ent.item[i])))
                                tmpminor.push($(this).text().trim().trim() + '\n');

                            });
                        }


                    }
                    tmp.push(tmpminor);
                }


                // for(let i of tmp){
                //     fs.writeFile(_path, i, { 'flag': 'a' },function (err) {
                //         if (!err)
                //           console.log("写入成功！")
                //       })

                // }
                console.log(tmp);
                progress();
                resolve(tmp);
            } catch (e) {
                console.log(e)
                reject(e);
            }

        })

}

async function renderstatic(arr:pageObj[]) {
    encoding=localStorage.getItem('encoding');
    let purl:any = [];
    let entryurl:any = [];
    let rawcontent:any = [];
    for (let i of arr) {
        if (i.type == 1) {
            try {
                purl = await new Promise((resolve, reject) => {

                    purlselection(i, resolve, reject);
                })
            } catch (e) {
                throw e
            }


        } else if (i.type == 2) {
            try {
                if (purl.length == 0) {
                    purl.push(i.url);
                }
                for (let j of purl) {

                    let tmpentryurl:any = await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            entryselection(i, j, resolve, reject);
                        }, TIME);
                        
                    })
                    entryurl.push(...tmpentryurl);
                }
            } catch (e) {
                throw e

            }


        } else if (i.type == 3) {
            console.log(entryurl);
            try {
                if (entryurl.length == 0) {
                    entryurl.push(i.url);
                }
                for (let j of entryurl) {
                    let tmpcontent = await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            contentselection(i, j, resolve, reject);
                        }, TIME);
                    })
                    rawcontent.push(tmpcontent);
                }
            } catch (e) {
                throw e

            }


        }

    }
    console.log(rawcontent);
    let outputType=localStorage.getItem('outputType');
    end();
    out(rawcontent,outputType);
    // import(/* webpackChunkName: "excelout" */'./excelout')
    //     .then(excelout => {
    //         excelout(rawcontent);
    //     })
    //     .catch(error => {
    //         /* Error handling */
    //         console.log(e);
    //     })

}


function hashreff(href:string){
    if (href != undefined) {
        return true;
    }
    return false;
    //this is for Baidu.com
}

export default render;
