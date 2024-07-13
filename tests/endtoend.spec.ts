import { Desktop } from "../page-Objects/SelectingItemToCart/computer-Desktop/pageManagerDesktop"
import { RegistrationPage } from "../page-Objects/RegistrationPage/pageManagerRP"
import { LoginPage } from "../page-Objects/LoginPage/pageManagerLP"
import { test } from "../test-options"

test.describe('register_login_addtocart',async ()=>{
    test('computerDesktops',async ({page,registrationPage})=>{
        const desktop = new Desktop(page)
        const register = new RegistrationPage(page)
        const log = new LoginPage(page)
        await register.rpregusr.registerUser()
        await page.getByText('Log out').click()
        await page.getByText('Log in').click()
        await log.login.loginCheck()
        await log.login.loggingIn()
        await desktop.byc.selectingBYCtoCart()
        await desktop.byc.verifyBYCToCart()
    })
})