import { Page,expect } from "@playwright/test"
import { faker } from "@faker-js/faker"
import { HelperBaseLP } from "../LoginPage/helperBase"


export class RegistrationPageVerify extends HelperBaseLP{
    constructor(page: Page){
        super(page)
    }

    async genderVerify(){
        const genderChecks = this.page.locator('.inputs').filter({hasText:'Gender'}).locator('span')
        for(var genderCheck of await genderChecks.all()){
            await genderCheck.locator('input').check({force:true})
            await expect(genderCheck.locator('input')).toBeChecked()
        }
    }

    async firstNameVerify(){
        await this.inputBoxVerifyBase('First name')
    }

    async lastNameVerify(){
        await this.inputBoxVerifyBase('Last name')
    }

    async dobVerify(){
        const dobChecks = this.page.locator('.date-picker-wrapper select')
        for(var dobCheck of await dobChecks.all()){
            expect(dobCheck.isEnabled()).toBeTruthy()
        }
    }

    async emailVerify(){
        await this.inputBoxVerifyBase('Email')

        await this.page.locator('.inputs').filter({hasText:'Email'}).locator('input').fill(faker.person.firstName())
        await this.page.locator('.inputs').filter({hasText:'Email'}).locator('span[class="required"]').click()
        const emailFVE = this.page.locator('.inputs').filter({hasText:'Email'}).locator('span[class="field-validation-error"] span')
        await expect(emailFVE).toHaveText('Please enter a valid email address.')
    }

    async companyVerify(){
        await this.inputBoxVerifyBase('Company name')
    }

    async newsletterVerify(){
        const newsLetter = this.page.locator('.inputs').filter({hasText:'Newsletter'}).locator('input')
        expect(await newsLetter.isEnabled()).toBeTruthy()
        const newsLetterCK = await newsLetter.isChecked()
        if (newsLetterCK == true){
            await newsLetter.uncheck({force:true})
            await expect(newsLetter).not.toBeChecked()
        }
        else{
            await newsLetter.check({force:true})
            await expect(newsLetter).toBeChecked()
        }
    }
    
    async passwordrVerify(){
        const password = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Password:')")}).locator('input')
        expect(await password.isEnabled()).toBeTruthy()
        const isReadOnlyPW = await password.evaluate((input:any) => !input.readOnly)
        expect(isReadOnlyPW).toBeTruthy()

        const confirmPassword = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Confirm password:')")}).locator('input')
        expect(await confirmPassword.isEnabled()).toBeTruthy()
        const isReadOnlyCPW = await confirmPassword.evaluate((input:any) => !input.readOnly) 
        expect(isReadOnlyCPW).toBeTruthy()

        await password.fill(faker.person.firstName())
        await confirmPassword.fill(faker.person.firstName())
        await this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Confirm password:')")}).locator('span[class="required"]').click()
        const passwordFVE = this.page.locator('.inputs').filter({has:this.page.locator("label:text-is('Confirm password:')")}).locator('span[class="field-validation-error"] span')
        await expect(passwordFVE).toHaveText('The password and confirmation password do not match.')
    }  
      
    private async inputBoxVerifyBase(textValue: string){
        const verifyFeild = this.page.locator('.inputs').filter({hasText:textValue}).locator('input')
        expect(await verifyFeild.isEnabled()).toBeTruthy()
        const isReadOnly = await verifyFeild.evaluate((input:any) => !input.readOnly)
        expect(isReadOnly).toBeTruthy()
    }

}