let a=document.getElementById('progress');
const title='Working on it\n';
let count=0;
function progress(){
    count++
    let str=`${title}${count} pages`;
    a.innerText=str;
}

function end(){
    count=0;
    a.innerText='Done!';
}

export {progress,end};
