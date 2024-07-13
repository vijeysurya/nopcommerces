import { Page} from "@playwright/test"
import { RegistrationPageVerify } from "./registrationPageVerify"
import { RegisterUser } from "./registerUser"

export class RegistrationPage{
    readonly page: Page
    readonly rpverify: RegistrationPageVerify
    readonly rpregusr: RegisterUser
    constructor(page: Page){
        this.page = page
        this.rpverify = new RegistrationPageVerify(this.page)
        this.rpregusr = new RegisterUser(this.page)
    }
}