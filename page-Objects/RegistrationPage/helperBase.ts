import { Page,expect } from "@playwright/test"

export class HelperBaseRP{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

  
}