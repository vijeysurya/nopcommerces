import ExcelJs from "exceljs"
//normal read and write in same function
async function excelPract(){
    let output = {row:-1,column:-1}
    const workbook = new ExcelJs.Workbook()//going to access workbook
    await workbook.xlsx.readFile("C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/Data.xlsx")//path of the excel file and we need to add wait meachanism here
    const worksheet = workbook.getWorksheet("Sheet1")//in which sheet
    worksheet?.eachRow((row,rowNumber)=>{//from the selected sheet going through each row and fetching the rownumber
        row.eachCell((cell,columnNumber)=>{//from the selected sheet going through each column and  fetching the columnumber
            console.log(cell.value)//printing
            if(cell.value === "SuryaJ"){
                console.log(rowNumber,columnNumber)
                output.row = rowNumber
                output.column = columnNumber
            //cell.value = "Vijey Surya"
            //workbook.xlsx.writeFile("C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/RegisterData.xlsx")  //and saving the file
            }
        })
    })
    //const cell = worksheet.getCell(3,2) //from the sheet go into the particular cell if you know the rownum and column num
    const cell = worksheet.getCell(output.row,output.column)
    cell.value = "Surya J" //giving new value for that cell
    workbook.xlsx.writeFile("C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/RegisterData.xlsx")  //and saving the file

}
excelPract()

//read and write in seperate function
/*async function writeExcel(searchFirstText,replaceText,change,filePath){
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

writeExcel("Vijey","CBA",{rowChange:0,columnChange:6},"C:/Users/Vijey Surya J/OneDrive/Documents/VijeySurya J/Trainings/Playwright/GitRepo/demo-nopcommerce/testData/RegisterData.xlsx")
*/


