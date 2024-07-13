import {Page,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"
import { HelperBaseLP } from "./helperBase"

export class LoginCheck_LoggingIn extends HelperBaseLP{
    constructor(page: Page){
        super(page)
    }
    
    async loginCheck(){
        await this.login('sud@gmail.com',faker.string.alpha(10),false)
    }

    async loggingIn(){
        await this.login('ihscfsshcvg@gmail.com','AusSyd@*394948',true)
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