import {ipcRenderer as ipc} from 'electron';
import PageObj from '../interfaces/pageObj';
import { type } from 'os';

let entryobj:PageObj = {};

let targetURL = '';
let count = 0;
let tbr:any=undefined;

function mainbind(main:any, allpage:PageObj[]) {

    selectionbind(main)();
    nextbind(main, allpage);
    rendericp(main, allpage);
    main.main.onclick=()=>{
        document.getElementById('setting').classList.remove("setting-active");
        
    }
}

function selectionbind(main:any) {
    let selected = false;
    return () => {
        main.main.onclick=()=>{
            if (selected) {
                main.selectorIcon.classList.remove("iconselected");
                main.selectorList.classList.remove("listselected");
                selected = false;

            }
        }
        main.selector.onclick = (e:any) => {
            e.stopPropagation();
            if (selected) {
                main.selectorIcon.classList.remove("iconselected");
                main.selectorList.classList.remove("listselected");
                selected = false;
            } else {

                main.selectorIcon.classList.add("iconselected");
                main.selectorList.classList.add("listselected");
                selected = true;

            }


        }
        main.selectorList.onclick = (e:any) => {
            let value=e.target.innerText;
            if(value=='search'){
                alert('功能开发中');
            }else{
                main.selectorInput.value = e.target.innerText;
            }
            
        }

    }
}

function nextbind(main:any, allpage:PageObj[]) {
    main.next.onclick = () => {
        targetURL = main.urlInput.value;
        if (allpage.length != 0 && targetURL == '' && main.selectorInput.value == '') {

        } else if (targetURL == '') {
            alert('请输入网址');
        } else if (main.selectorInput.value == '') {
            alert('请选择类型');
        } else {
            let wrongurl = targetURL.indexOf('http') == -1 && targetURL.indexOf('http') == -1
            if (wrongurl) {
                targetURL = `https://${targetURL}`;
            }
            ipc.send('targetPage', targetURL);
        }

    }

}

function nextpage(main:any) {

}

function rendericp(main:any, allpage:PageObj[]) {
    ipc.on('arrchanged', (e:any, arg:any) => {
        entryobj.entry = arg;
    });

    ipc.on('closesub', () => {

        let type = main.selectorInput.value;
        main.selectorInput.value = '';
        main.urlInput.value = '';
        if (type == 'page') {
            entryobj.type = 1;
        } else if (type == 'title') {
            entryobj.type = 2;
        } else if (type == 'content') {
            entryobj.type = 3;
        } else {
            entryobj.type = 4;
        }

        if (entryobj.type == 1) {
            // let pageselect=document.getElementById(`pageselect${boxcount}`).querySelectorAll('input');
            //     entryobj.range=[];
            // for(let i of pageselect){
            //     entryobj.range.push(i.value);
            // }
        }


        entryobj.url = targetURL;
        if(entryobj.entry!=undefined&&entryobj.entry.length!=0){
            allpage.push({
                ...entryobj
            });
            console.log('fuck');
            if(tbr){
                tbr(entryobj)
                
            }else{
                main.formbuttons.style.visibility='visible';
                tbr=tablerender(main,allpage);
                tbr(entryobj);
            }
            
        }
        
        console.log(entryobj);
        
        entryobj = {};
        console.log(allpage);


    });
}

function tablerender(main:any,allpage:PageObj[]) {
    let isfirst = true;
    let t = main.formTemplate;
    let formnum = t.content.querySelector('.formnum');
    let formurl = t.content.querySelector('.formurl');
    let formtype = t.content.querySelector('.formtype');
    main.formdelete.onclick=()=>{
        let entrydelete=document.querySelectorAll('.formdelete');
        if(entrydelete.length==0){
            return
        }
        main.entryform.removeChild(entrydelete[entrydelete.length-1]);
        allpage.pop();
    }

    main.formreset.onclick=()=>{
        let entrydelete=document.querySelectorAll('.formdelete');
        if(entrydelete.length==0){
            return
        }
        for(let i of entrydelete){
            main.entryform.removeChild(i);
        }
        allpage=[];
        
    }

    return (obj:PageObj,) => {
        if (isfirst) {
            main.formTitle.style.display = 'inline-block';
            isfirst = false;
        }
        // if(main.formTitle.style.visibility=='hidden'){
        //     main.formTitle.style.visibility='visible';
        // }
        count++;
        formnum.textContent = count;
        formurl.textContent = obj.url;
        formtype.textContent = transfertype(obj.type);

        let clone = document.importNode(t.content, true);
        
        main.entryform.insertBefore(clone,t);
    }

}

function transfertype(num:number){
    switch (num){
        case 1 :
        return "page";
        case 2 :
        return "title";
        case 3 :
        return "content";
        default :
        return "search";
    }

    
        
}

export default mainbind;