import ExcelJs from "exceljs"
import { skip } from "node:test"

async function excelReadRegisterLogin(sheetName){
    let ex_Arrs = []
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile("C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/Data.xlsx")
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