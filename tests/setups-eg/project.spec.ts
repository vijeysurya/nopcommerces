import {test} from "@playwright/test"

test('project',async ({page})=>{
    await page.goto("/")
    console.log(await page.title())
    console.log("Im executed third")
})