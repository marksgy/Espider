import * as compress from 'compressing'


function unCompress(f:string,to:string){
    
    if(!f){
        throw 'invalid filename'
    }

    let temp=f.split('/');
    let fileName=temp[-1];
    let fileType=fileName.split('.')[-1];


    if((fileType=="tar")||(fileType=="gzip")||(fileType=="tgz")||(fileType=="zip")){
        compress[fileType].uncompress(f,to)
        .then()
        .catch();
    }else{
        throw 'unsupported filetype'
    }
    
}

export {unCompress};