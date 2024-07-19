import {Page,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"
import { HelperBaseLP } from "./helperBase"
import excelReadRegisterLogin from "../helperBase"

export class LoginCheck_LoggingIn extends HelperBaseLP{
    constructor(page: Page){
        super(page)
    }
    
    async loginCheckExcel(){
        let ex_Arrs = await excelReadRegisterLogin("loginCheck")
        for(var ex_Arr of ex_Arrs){
            await this.page.locator('#Email').fill(ex_Arr[0])
            await this.page.locator('#Password').click()
            await expect(this.page.locator('#Email-error')).toHaveText('Please enter a valid email address.')
            await this.page.locator('#Email').clear()
            await expect(this.page.locator('#Email-error')).toHaveText('Please enter your email')
        }
    }

    async loginCheck(){
        await this.login('xczmns@gmail.com',faker.string.alpha(10),false)
    }


    async loggingInExcel(){
        let ex_Arrs = await excelReadRegisterLogin("registerUsr")
        console.log(ex_Arrs)
        for(var ex_Arr of ex_Arrs){
            await this.login(ex_Arr[6].text,ex_Arr[9].text,true)
            await this.page.getByRole('link',{name:'Log out'}).click()
            await expect(this.page.getByRole('link',{name:'Log in'})).toBeVisible()
            await this.page.getByRole('link',{name:'Log in'}).click()
        }
    }


    async loggingIn(){
        await this.login('vijeysssdddmcc@gmail.com','AusSyd@*394948',true)
    }

    private async login(emailId:string,password:string,loginType:boolean){
        await this.page.locator('#Email').fill(emailId)
        await this.page.locator('#Password').fill(password)
        await this.page.getByRole('button',{name:'Log in'}).click()
        if(loginType){
            await expect(this.page.getByRole('link',{name:'Log out'})).toBeVisible()
            
        }
        else{
            expect(await this.page.locator('.message-error').textContent()).toContain('No customer account found')
        }

    }
}