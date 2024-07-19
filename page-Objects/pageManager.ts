import {Page} from "@playwright/test"
import { RegistrationPage } from "../page-Objects/RegistrationPage/pageManagerRP"
import { LoginPage } from "../page-Objects/LoginPage/pageManagerLP"
import { Desktop } from "../page-Objects/SelectingItemToCart/computer-Desktop/pageManagerDesktop"


export class PageManager{
    readonly page: Page
    readonly log: LoginPage
    readonly register: RegistrationPage
    readonly desktop: Desktop
    constructor(page: Page){
        this.page = page
        this.register = new RegistrationPage(page)
        this.log = new LoginPage(page)
        this.desktop = new Desktop(page)
    }  
}