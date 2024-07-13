import { test } from "@playwright/test"
import { Desktop } from "../page-Objects/SelectingItemToCart/computer-Desktop/pageManagerDesktop"


test.beforeEach(async ({page})=>{
    await page.goto('/')
})

test.describe('select item to cart and verify',async ()=>{
    test('computerDesktops',async ({page})=>{
        const desktop = new Desktop(page)
        await desktop.byc.selectingBYCtoCart()
        await desktop.byc.verifyBYCToCart()
    })
})
