import ExcelJs from "exceljs"
import {test,expect} from "@playwright/test"

async function writeExcel(searchFirstText,replaceText,change,filePath){
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)//path of the excel file and we need to add wait meachanism here
    const worksheet = workbook.getWorksheet("Sheet1")
    const output = await readExcel(worksheet,searchFirstText)
    const cell = worksheet.getCell(output.row,output.column+change.columnChange)//+change.columnChange is based on the filter criteria Vijey we are changing CBA into 7th column
    cell.value = replaceText
    workbook.xlsx.writeFile(filePath)  //and saving the file
}

async function readExcel(worksheet,searchFirstText,){
    let output = {row:-1,column:-1}
    worksheet?.eachRow((row,rowNumber)=>{
        row.eachCell((cell,columnNumber)=>{
            if(cell.value === searchFirstText){
                output.row = rowNumber
                output.column = columnNumber
            }
        })
        })
        return output
}

export default writeExcel
//writeExcel("Vijey","CBA",{rowChange:0,columnChange:6},"C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/RegisterData.xlsx")

test("Download Modify Upload Assert",async ({page})=>{
    const textSearch = "Apple"
    const textReplace = "Summer"
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const downloadAwait = page.waitForEvent('download')
    await page.getByRole('button',{name:'Download'}).click() //need to add waiting time for this
    await downloadAwait
    writeExcel(textSearch,textReplace,{rowChange:0,columnChange:3},"C:/Users/Vijey Surya J/Downloads/download.xlsx")
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("C:/Users/Vijey Surya J/Downloads/download.xlsx")
    const receivedValue = await page.getByRole('row',{name:'Apple'}).locator('..').locator('#cell-5-undefined').textContent()
    expect(receivedValue).toEqual(textSearch)
})