import {Page} from "@playwright/test"
import { BuildYourComputer } from "./buildYourComputer"

export class Desktop{
    readonly page: Page
    readonly byc: BuildYourComputer
    constructor(page: Page){
        this.page = page
        this.byc = new BuildYourComputer(this.page)
    }
    
    
}