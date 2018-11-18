///<reference path='../declarations.d.ts' />
import * as Excel from 'exceljs'
import * as path from 'path';
let count = 0;


function excelout(rawcontent:any[]) {
    let filepath=localStorage.getItem('filepath');
    let filename = `${filepath}\\test.xlsx`.split(path.sep).join('/');
    
    let workbook = new Excel.Workbook();
    for (let i = 0; i <= rawcontent.length - 1; i++) {
        let sheet = workbook.addWorksheet(`${i + 1}`);
        for (let j = 0; j <= rawcontent[i].length - 1; j++) {
            sheet.getColumn(j + 1).values = rawcontent[i][j];
        }

    }


    workbook.xlsx.writeFile(filename).then(function () {
        console.log('success');
    }, function (err:Error) {
        console.log(err);
    });

}

export default excelout;