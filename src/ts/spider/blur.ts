//this is for vuejs.cn

function blur(finder:string):string[]{
    let newfinder=finder.split('.').map((it)=>{
        return '.'+it;
    });
    newfinder.splice(0,1);
    // console.log($);
    return combination(newfinder,[],[]);
    
}

function combination(arr:string[],newarr:string[][],ans:any):string[]{
    
    
    if(newarr.length==0){
        let tmp:any=[];
        for(let i of arr){
            tmp.push([i]);
        }
        // console.log(tmp);
        // let answer=dosth($,tmp);
        // if(answer){
        //     return answer
        // }
        ans.push(...tmp)
        combination(arr,tmp,ans);
    }else{
        for(let i of newarr){
            let last=i[i.length-1];
            let index=arr.indexOf(last);
            
            if(index==arr.length-1){
                return
            }
            let tmp1:any=[];
            for(let j=index+1;j<arr.length;j++){
                tmp1.push([...i,arr[j]]);
            }
            // console.log(tmp1);
            // let answer=dosth($,tmp1);
            // if(answer){
            //     return answer
            // }
            ans.push(...tmp1);
            combination(arr,tmp1,ans);
        }
    }
    ans=ans.map((e:string[])=>{return e.join('')});
    return ans;
    
}

// function dosth($,arr){
//     for(let i of arr){
//         let entry=`.${i.join('.')}`;
//         console.log('begin');

//         let finder=$(entry);
//         console.log('end')
//         console.log(finder);
        
//         if(finder.length==1){
//             return finder
//         }else{
//             return false
//         }
//     }
// }
export default blur;