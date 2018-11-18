"use strict";
//this is for vuejs.cn
Object.defineProperty(exports, "__esModule", { value: true });
function blur(finder) {
    let newfinder = finder.split('.').map((it) => {
        return '.' + it;
    });
    newfinder.splice(0, 1);
    // console.log($);
    return combination(newfinder, [], []);
}
function combination(arr, newarr, ans) {
    if (newarr.length == 0) {
        let tmp = [];
        for (let i of arr) {
            tmp.push([i]);
        }
        // console.log(tmp);
        // let answer=dosth($,tmp);
        // if(answer){
        //     return answer
        // }
        ans.push(...tmp);
        combination(arr, tmp, ans);
    }
    else {
        for (let i of newarr) {
            let last = i[i.length - 1];
            let index = arr.indexOf(last);
            if (index == arr.length - 1) {
                return;
            }
            let tmp1 = [];
            for (let j = index + 1; j < arr.length; j++) {
                tmp1.push([...i, arr[j]]);
            }
            // console.log(tmp1);
            // let answer=dosth($,tmp1);
            // if(answer){
            //     return answer
            // }
            ans.push(...tmp1);
            combination(arr, tmp1, ans);
        }
    }
    ans = ans.map((e) => { return e.join(''); });
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
exports.default = blur;
