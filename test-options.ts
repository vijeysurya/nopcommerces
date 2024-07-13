import {test as base,expect} from "@playwright/test"

export type TypeOptions = {  //exporting to use in testRunner
    titleValue : string
    registrationPage : string
    loginPages : string
}


export const test = base.extend<TypeOptions>({
    titleValue : ['',{option:true}],

    registrationPage :  async ({page,titleValue},use)=>{
        await page.goto('/')
        expect(await page.title()).toEqual(titleValue)
        await page.getByRole('link',{name: process.env.register}).click()
        await expect(page.locator('.page-body')).toBeVisible()
        await use('')
    },

    loginPages :  async ({page,titleValue},use)=>{
        await page.goto('/')
        expect(await page.title()).toEqual(titleValue)
        await page.getByRole('link',{name: process.env.login}).click()
        await expect(page.locator('.form-fields')).toBeVisible()
        await use('')
    }


})
