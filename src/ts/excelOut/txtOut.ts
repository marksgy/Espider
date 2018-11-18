import * as fs from 'fs';
import * as path from 'path';



function txtOut(rawcontent:any[]){
    let filepath=localStorage.getItem('filepath');
    let filename =path.resolve(filepath).split(path.sep).join('/');
    // fs.exists(filename,(b)=>{
    //     if(!b){
    //         fs.mkdir(filename)
    //     }
    // })
    for (let i = 0; i <= rawcontent.length - 1; i++) {
        let thisname=`${filename}/${i}.txt`;
        console.log(thisname)
        for (let j = 0; j <= rawcontent[i].length - 1; j++) {
            fs.writeFile(thisname, `${rawcontent[i][j]}\n`,{ 'flag': 'a' },function(err){
                if(err) console.log(err);
            });
        }

    }
}

export default txtOut;