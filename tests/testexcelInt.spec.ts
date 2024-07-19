import { PageManager } from "../page-Objects/pageManager"
import { test } from "../test-options"

test('excel test RP',async ({page,registrationPage})=>{
    const pm = new PageManager(page)
    await pm.register.rpregusr.registerUserExcel()
})

test.only('excel test LP',async ({page,loginPages})=>{
    const pm = new PageManager(page)
    await pm.log.login.loginCheckExcel()
    await pm.log.login.loggingInExcel()
})