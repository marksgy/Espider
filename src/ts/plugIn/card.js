window.cardcount=1;
window.order=['card1'];

//进入插入区
function enter(ev){
    event.preventDefault();
    ev.target.className =" append-ondragover";
}

//离开插入区
function leave(ev){
    event.preventDefault();
    ev.target.className =" append";
}

//添加卡片
function add(cardName){
    let t=document.getElementById('card-model');
    let clone2 = document.importNode(t.content, true);
    // clone2.id=`card${cardcount++}`;
    
    
    let mainn=document.getElementById('main');
    mainn.insertBefore(clone2,mainn.lastElementChild);
    
    let card=mainn.lastElementChild.previousElementSibling;
    card.id=`card${++cardcount}`;


    //设置卡片内容
    card.getElementsByClassName('cardBody')[0].textContent=selectCardBody(cardName);
    
    //增加排序信息
    let append=card.previousElementSibling;
    append.setAttribute('number',`${cardcount}`);

    order.push(card.id);

}

//获取自定义card内容
function selectCardBody(cardName){
    //需要一个全局的存储，或者本地存储，有待设计
}

function customCardBody(cardName){
    //重名判断
    //包含html，js，css和json
    //json文件包含该组件的输入输出元素


    //eval注入，同时保存至本地插件库
}

function dragStart(ev){
    ev.dataTransfer.setData("Text",ev.target.parentNode.id);
    
}



function drop(ev){
    // console.log(ev.target);
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");

    let card=document.getElementById(data)
    let append=card.previousElementSibling;
    ev.target.parentNode.insertBefore(document.getElementById(data),ev.target);
    card.parentNode.insertBefore(append,card);

    ev.target.className =" append";


    let toPlace=parseInt(ev.target.getAttribute("number"));
    toPlace=toPlace?toPlace:order.length+1;
    let fromPlace=parseInt(append.getAttribute("number"));

    appendOrderChange(toPlace,fromPlace);

    if(toPlace<fromPlace){
        append.setAttribute('number',toPlace);

    }else if(toPlace>fromPlace+1){
        append.setAttribute('number',toPlace-1);
    }
    if(toPlace-1<=order.length&&toPlace!=fromPlace){
        arrayOrderChange(toPlace,fromPlace);
    }
    
    
}


function appendOrderChange(to,from){
    let appends=document.getElementsByClassName('append');
    if(to<from){
        for(let i of appends){
            let num=i.getAttribute("number");
            if(num>=to&&num<from){
                
                i.setAttribute("number",++num);
            }
        }


    }

 
    if(to>from+1){
        
        for(let i of appends){
            let num=i.getAttribute("number");
    
            let a = num<to&&num>from;
   
            if(num<to&&num>from){
                
                i.setAttribute("number",--num);
            }
        }

    }

   
    

}

function arrayOrderChange(to,from){
    console.log([from,to])
    if(from>to){
        order.splice(to-1,0,order[from-1]);
        console.log([from,to])
        order.splice(from,1);
    }else{
        order.splice(to-1,0,order[from-1]);
        order.splice(from-1,1);
        
    }
    
    console.log(order);
}

function over(ev){
    ev.preventDefault();
}

function show(ev){
    let body=ev.target.parentNode.nextElementSibling;
    if(body.getAttribute('class')=="cardBody"){
        body.setAttribute('class','cardBodyNone');
    }else{
        body.setAttribute('class','cardBody');
    }
    
    
}

//scrollby,ondrag监听，优化拖动时的滚动

const scrollBar=50;
function drag(ev){
    if(document.body.clientHeight-ev.clientY<=scrollBar){
        document.getElementById('main').scrollBy(0,0.2*movement(scrollBar-(document.body.clientHeight-ev.clientY)));
    }

    if(ev.clientY<100&&ev.clientY>0){
        document.getElementById('main').scrollBy(0,-0.2*movement(scrollBar-ev.clientY));
    }
    console.log('fuck');
    
    
}


function movement(num){
    return Math.min(Math.pow(num,2),100);
}