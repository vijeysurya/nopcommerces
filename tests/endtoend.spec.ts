import { test } from "../test-options"
import { PageManager } from "../page-Objects/pageManager"
import { argosScreenshot } from "@argos-ci/playwright"


test.describe('register_login_addtocart',async ()=>{
    test('computerDesktops',async ({page,registrationPage})=>{
        const pm = new PageManager(page)
        await pm.register.rpregusr.registerUser()//single user register
        await page.getByRole('link',{name:'Log out'}).click()
        await page.getByRole('link',{name:'Register'}).click()
        await pm.register.rpregusr.registerUserExcel()//multiple register creation using excel
        await page.getByText('Log in').click()
        await pm.log.login.loginCheck()
        await argosScreenshot(page, "loginCheckScreenshot");
        await pm.log.login.loginCheckExcel()//multiple email wrong inputs using excel
        await pm.log.login.loggingIn()
        await pm.desktop.byc.selectingBYCtoCart()
        await pm.desktop.byc.verifyBYCToCart()
    })
})