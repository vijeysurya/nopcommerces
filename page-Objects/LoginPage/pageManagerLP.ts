import {Page} from "@playwright/test"
import {LoginCheck_LoggingIn} from "./loginCheck_loggingIn"

export class LoginPage{
    readonly page: Page
    readonly login: LoginCheck_LoggingIn
    constructor(page: Page){
        this.page = page
        this.login = new LoginCheck_LoggingIn(this.page)
    }

}