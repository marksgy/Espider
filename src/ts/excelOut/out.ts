import excelOut from './excelOut';
import txtOut from './txtOut';

function Outt(rawcontent:any[],type:string){
    if(type=="txt"){
        txtOut(rawcontent);
    }else if(type=="excel"){
        excelOut(rawcontent);
    }
}

export default Outt;