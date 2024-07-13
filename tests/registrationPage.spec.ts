import { RegistrationPage } from "../page-Objects/RegistrationPage/pageManagerRP"
import { test } from "../test-options"

test.describe('registrationPage',()=>{
    test('elementsVerify', async ({page,registrationPage})=>{
        const register = new RegistrationPage(page)
        await register.rpverify.genderVerify()
        await register.rpverify.firstNameVerify()
        await register.rpverify.lastNameVerify()
        await register.rpverify.dobVerify()
        await register.rpverify.emailVerify()
        await register.rpverify.companyVerify()
        await register.rpverify.newsletterVerify()
        await register.rpverify.passwordrVerify()
    })
    test('register the user',async ({page,registrationPage})=>{
        const register = new RegistrationPage(page)
        await register.rpregusr.registerUser()
    })
})