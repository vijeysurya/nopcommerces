import { LoginPage } from "../page-Objects/LoginPage/pageManagerLP"
import { test } from "../test-options"

test.describe('loginPage',()=>{
    test('invalid login check',async ({page,loginPages})=>{
        const loginPage = new LoginPage(page)
        await loginPage.login.loginCheck()
    })
    test('login',async ({page,loginPages})=>{
        const loginPage = new LoginPage(page)
        await loginPage.login.loggingIn()
    })
})