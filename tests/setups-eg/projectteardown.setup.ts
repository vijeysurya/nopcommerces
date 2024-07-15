import {expect, test as setup} from "@playwright/test"

setup('projectteardown',async ({page})=>{
    await page.goto("/")
    await page.getByRole('link',{name:'Log in'}).click()
    console.log("Im executed fourth")
})