import { Page } from "@playwright/test"

export class HelperBaseLP{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

  
}