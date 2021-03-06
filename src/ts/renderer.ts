// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
///<reference path='./declarations.d.ts' />
import mainbind from './viewBind/mainbind';
import headerBind from './viewBind/headerbind'
import settingbind from './viewBind/settingbind';
import PageObj from './interfaces/pageObj';



let allpage:PageObj[]=[];

const obj={
    header:{
        menu:document.getElementById("menu"),
        espider:document.getElementById("espider"),
        devTool:document.getElementById("devtool"),
        excel:document.getElementById("excel"),
        headerMin:document.getElementById("headermin"),
        headerMax:document.getElementById("headermax"),
        headerCross:document.getElementById("headercross"),
    },
    main:{
        main:document.getElementsByTagName('main')[0],
        urlInput:document.getElementById('urlinput'),
        selector:document.getElementById('selector'),
        selectorInput:document.getElementById('selectorinput'),
        selectorList:document.getElementById('selectorlist'),
        selectorIcon:document.getElementById('selectoricon'),
        next:document.getElementById('next'),

        entryform:document.getElementById('entryform'),
        formTitle:document.getElementById('formtitle'),
        formTemplate:document.getElementById('formtemplate'),

        formreset:document.getElementById('form-reset'),
        formdelete:document.getElementById('form-delete'),
        formbuttons:document.getElementById('formbutton'),

    },
    setting:{
        setting: document.getElementById('setting'),
        btn: document.getElementById('setting-btn'),
        intervalinput: document.getElementById('setting-interval-input'),
        folderp: document.getElementById('folder-p'),
        folderselection: document.getElementById('folderselection'),
        openfolder:document.getElementById('open-folder'),
        outputType:document.getElementsByName('output-type'),
        encoding:document.getElementsByName('encoding'),
    }

    
    
}

function init(){
    headerBind(obj.header,allpage);
    mainbind(obj.main,allpage);
    settingbind(obj.setting);
    // alert('2');
    
    
}

init()

