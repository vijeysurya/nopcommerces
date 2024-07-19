import ExcelJs from "exceljs"
import { skip } from "node:test"
import path from "path"

async function excelReadRegisterLogin(sheetName){
    let ex_Arrs = []
    const workbook = new ExcelJs.Workbook()
    const filePath = path.resolve(__dirname, '../testData/Data.xlsx');
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(sheetName)
    worksheet?.eachRow((row,rowNumber)=>{
        if(rowNumber==1){
            skip
        }
        else{
            let ex_Arrss=[]
            row.eachCell((cell,columnNumber)=>{
                ex_Arrss.push(cell.value)
            })
            ex_Arrs.push(ex_Arrss)
        }
    })
    return ex_Arrs
}

export default excelReadRegisterLogin