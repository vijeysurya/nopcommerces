import ExcelJs from "exceljs"
import {test,expect} from "@playwright/test"
import fs from 'fs'
import path from "path"

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
//writeExcel("Vijey","CBA",{rowChange:0,columnChange:6},"C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/RegisterData.xlsx")

test("Download Modify Upload Assert",async ({page})=>{
    const textSearch = "Apple"
    const textReplace = "Summer"
    const downloadDir = path.join(__dirname, 'downloads')
    const filePath = path.join(downloadDir, 'download.xlsx')
    // Ensure download path exists
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true })
    }
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()
    ])
    await download.saveAs(filePath)
    //await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust timeout as needed
    writeExcel(textSearch,textReplace,{rowChange:0,columnChange:3},filePath)
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles(filePath)
    const receivedValue = await page.getByRole('row',{name:'Apple'}).locator('#cell-5-undefined').textContent()
    expect(receivedValue).toEqual(textReplace)
})