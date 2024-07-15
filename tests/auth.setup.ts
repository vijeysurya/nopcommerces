import { test as setup, expect} from "@playwright/test"
import { LoginPage } from "../page-Objects/LoginPage/pageManagerLP"
//const cheerio = require('cheerio');

const authFile = '.auth/users.json'

setup('Authentication',async ({page})=>{
    const loginPage = new LoginPage(page)
    await page.goto('/')
    expect(await page.title()).toEqual('nopCommerce demo store')
    await page.getByRole('link',{name: 'Log in'}).click()
    await expect(page.locator('.form-fields')).toBeVisible()
    await loginPage.login.loggingIn()
    await page.context().storageState({path:authFile})
    console.log("Im executed first")
})

/*setup('testAPILogin',async ({request})=>{
    const responseGet = await request.get('https://demo.nopcommerce.com/')
    const responseGetBody = await responseGet.text()
    const $ = cheerio.load(responseGetBody);
    const inputValue = $('input[name="__RequestVerificationToken"]').val();
    console.log(inputValue);  //new learning

    const formData = new URLSearchParams();
    formData.append('Email', 'sudivb@gmail.com');
    formData.append('Password', 'AusSyd@*394948');
    formData.append('__RequestVerificationToken', `${inputValue}`);
    formData.append('RememberMe', 'false');
    const responseRe = await fetch("https://demo.nopcommerce.com/login?returnurl=%2F",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })

})*/