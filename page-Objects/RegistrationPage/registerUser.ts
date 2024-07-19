import { Page,expect} from "@playwright/test"
import { HelperBaseRP } from "./helperBase"
import { skip } from "node:test"
import excelReadRegisterLogin from "../helperBase"



export class RegisterUser extends HelperBaseRP{
    constructor(page: Page){
        super(page)
    }

    async registerUser(){
        const genderCheck = this.page.locator('.inputs').filter({hasText:'Gender'}).locator('span[class="male"]')
        await genderCheck.locator('label').click()
        await expect(genderCheck.locator('label')).toBeChecked()
        await this.inputBox("First name","Vijey")
        await this.inputBox("Last name","SuryaJ")
        await this.dob("DateOfBirthDay","9")
        await this.dob("DateOfBirthMonth","May")
        await this.dob("DateOfBirthYear","1997")
        await this.inputBox("Email","vijeysssdddmcc@gmail.com")
        await this.inputBox("Company name","TCS")
        const password = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Password:')")}).locator('input')
        await password.fill("AusSyd@*394948")
        expect(await password.inputValue()).toEqual("AusSyd@*394948")
        const cfpassword = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Confirm password:')")}).locator('input')
        await cfpassword.fill("AusSyd@*394948")
        expect(await cfpassword.inputValue()).toEqual("AusSyd@*394948")
        await this.page.getByRole('button',{name:'Register'}).click()
        await expect(this.page.locator('.result')).toHaveText('Your registration completed')
        await this.page.getByRole('link',{name:'Continue'}).click()
    }

    async registerUserExcel(){
        let ex_Arrs = await excelReadRegisterLogin("registerUsr")
        for(var ex_Arr of ex_Arrs){
            const genderCheck = this.page.locator('.inputs').filter({hasText:'Gender'}).locator(`span[class="${ex_Arr[0]}"]`)
            await genderCheck.locator('label').click()
            await expect(genderCheck.locator('label')).toBeChecked()
            await this.inputBox("First name",`${ex_Arr[1]}`)
            await this.inputBox("Last name",`${ex_Arr[2]}`)
            await this.dob("DateOfBirthDay",`${ex_Arr[3]}`)
            await this.dob("DateOfBirthMonth",`${ex_Arr[4]}`)
            await this.dob("DateOfBirthYear",`${ex_Arr[5]}`)
            await this.inputBox("Email",`${ex_Arr[6].text}`)
            await this.inputBox("Company name",`${ex_Arr[7]}`)
            if(ex_Arr[8]){
                skip
            }
            else
            {
                await this.page.locator('#Newsletter').click()
            }
            const password = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Password:')")}).locator('input')
            await password.fill(`${ex_Arr[9].text}`)
            expect(await password.inputValue()).toEqual(`${ex_Arr[9].text}`)
            const cfpassword = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Confirm password:')")}).locator('input')
            await cfpassword.fill(`${ex_Arr[10].text}`)
            expect(await cfpassword.inputValue()).toEqual(`${ex_Arr[10].text}`)
            await this.page.getByRole('button',{name:'Register'}).click()
            await expect(this.page.locator('.result')).toHaveText('Your registration completed')
            await this.page.getByRole('link',{name:'Continue'}).click()
            await this.page.getByRole('link',{name:'Log out'}).click()
            await this.page.getByRole('link',{name:'Register'}).click()
        }
    }

    /**
     * this fucntion will be common for all the input tags operations in registration page
     * @param nameOfSelect provide the name attribute value
     * @param optiontxt provide the required value for filling form
     */
    private async dob(nameOfSelect:string,optiontxt:string){
        const day = this.page.locator(`.date-picker-wrapper select[name=${nameOfSelect}]`)
        const dayoptions = day.locator('option')
        for(var dayoption of await dayoptions.all()){
            const dayoptiontxt = await dayoption.textContent()
            if(dayoptiontxt==optiontxt){
                await day.selectOption(dayoptiontxt)
                break
            }
        } 
    }

    /**
     * this fucntion will be common for all the dropdown tags operations in registration page
     * @param hasText provide the text for filtering the locator
     * @param fillValue provide the required value for filling form
     */
    private async inputBox(hasText:string,fillValue:string){
        const firstName = this.page.locator('.inputs').filter({hasText:hasText}).locator('input')
        await firstName.fill(fillValue)
        expect(await firstName.inputValue()).toEqual(fillValue)
    }
}