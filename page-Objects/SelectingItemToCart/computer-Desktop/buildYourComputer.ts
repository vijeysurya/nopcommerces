import {Page,expect} from "@playwright/test"
import configDetails from "./testData/byc.json"

export class BuildYourComputer{
    readonly page: Page
    expectedProductPrice
    expectedQuantityValue: string
    expectedSkuValue
    constructor(page: Page){
        this.page = page
    }

    async selectingBYCtoCart(){
        const computerLC = this.page.locator('.top-menu.notmobile li a',{hasText:'Computers '})
        await computerLC.hover()

        //selecting desktop and this can be global for selecting different subcategories of computers based on our input
        const computerCategorys = computerLC.locator('..').locator('ul li a')
        for(var computerCategory of await computerCategorys.all()){
            const computerCategoryVal = await computerCategory.textContent()
            if(computerCategoryVal?.trim() == 'Desktops'){
                await computerCategory.click()
            }
        }
        expect(await this.page.title()).toEqual('nopCommerce demo store. Desktops')

        //grabbing all the desktops products and selecting the required one
        const desktopDetails = this.page.locator('.item-grid .product-item .details')
        for(var desktopDetail of await desktopDetails.all()){
            const desktopDetailVal = await desktopDetail.locator('a').textContent()
            if(desktopDetailVal?.trim() == 'Build your own computer'){
                await desktopDetail.locator('a').click()
                break
            }
        }
        await expect(this.page.locator('.overview')).toBeVisible()

        //selecting configuration for building computer
        await this.processor_ram('#product_attribute_input_1 select',configDetails.processor)
        await this.processor_ram('#product_attribute_input_2 select',configDetails.ram)
        await this.hdd_ossSelect('#product_attribute_input_3 li',configDetails.hdd)
        await this.hdd_ossSelect('#product_attribute_input_4 li',configDetails.os)
        const softwares = this.page.locator('#product_attribute_input_5 li')
        for(var software of await softwares.all()){
            if(await software.locator('input').isChecked()){
                await software.locator('input').uncheck()
            }
        }
        for(var software of await softwares.all()){
            const softwareVal = await software.textContent()
            if(softwareVal?.trim()==configDetails.software){
                await software.locator('input').check({force:true})
                await expect(software.locator('input')).toBeChecked()
            }
        }

        //Capturing values to assert
        await this.page.waitForLoadState('networkidle')
        this.expectedProductPrice = await this.page.locator('.prices .product-price #price-value-1').textContent()
        this.expectedQuantityValue = await this.page.locator('#product_enteredQuantity_1').inputValue()
        this.expectedSkuValue = await this.page.locator('.additional-details div #sku-1').textContent()

        //adding to cart
        await this.page.getByRole('button', {name:'Add to cart'}).click()
        const shoppingCartMsg = this.page.locator('.bar-notification.success')
        await expect(shoppingCartMsg).toHaveCSS("background-color","rgb(75, 176, 122)")
        await expect(shoppingCartMsg).toHaveText('The product has been added to your shopping cart')
        await shoppingCartMsg.locator('span').click()
        await this.page.locator('#topcartlink a').click()
        expect(await this.page.title()).toEqual('nopCommerce demo store. Shopping Cart')
    }

    /**
     * Similar fucntion to handle both hdd and os config select
     * @param configLocator provide appropriate locator find the element
     * @param configToSelect provide appropriate config to the element
     */
    private async hdd_ossSelect(configLocator:string,configToSelect:string){
        const hdd_osS = this.page.locator(configLocator)
        for(var hdd_os of await hdd_osS.all()){
            const hdd_osVal = await hdd_os.textContent()
            if(hdd_osVal?.trim()==configToSelect){
                if(await hdd_os.locator('input').isChecked()){
                    break
                }
                else{
                    await hdd_os.locator('input').check({force:true})
                    await expect(hdd_os.locator('input')).toBeChecked()
                    break
                }
    
            }
        }
    }

    /**
     * Similar fucntion to handle both processor and ram config select
     * @param configLocator provide appropriate locator find the element
     * @param configToSelect provide appropriate config to the element
     */
    private async processor_ram(configLocator:string,configToSelect:string){
        const processorSelect = this.page.locator(configLocator)
        await processorSelect.selectOption(configToSelect)
    }

    async verifyBYCToCart(){
        await this.sku_price_quantity('.sku span',this.expectedSkuValue,false)
        const actualConfigVal = await this.page.getByRole('row',{name:"Build your own computer"}).locator('.product .attributes').textContent()
        function parseConfig(configStr) {
            const actualConfigObj = {}
            const parts = configStr.split(/(Processor:|RAM:|HDD:|OS:|Software:)/).filter(Boolean)
            for (let i = 0; i < parts.length; i += 2) {
                const key = parts[i].trim()
                const value = parts[i + 1] ? parts[i + 1].trim() : ''
                actualConfigObj[key] = value
            }
            return actualConfigObj
        }
        const actualConfigObj = parseConfig(actualConfigVal)
        function compareObjectValues(actualConfigObj, configDetails) {
            const values1 = Object.values(actualConfigObj).sort()
            const values2 = Object.values(configDetails).sort()
            return JSON.stringify(values1) === JSON.stringify(values2)
        }
        expect(compareObjectValues(actualConfigObj,configDetails)).toBeTruthy()

        await this.sku_price_quantity('.unit-price span',this.expectedProductPrice,false)
        await this.sku_price_quantity('.product-quantity input',this.expectedQuantityValue,true)
    }

    /**
     * Similar fucntion to parse the value of config labels
     * @param configLocator provide appropriate locator find the element
     * @param expectedVal provide appropriate expectedValue to the element
     */
    private async sku_price_quantity(configLocator:string,expectedVal:string,valueTypeInput:boolean){
        const rowNavi = this.page.getByRole('row',{name:"Build your own computer"})
        if(valueTypeInput){
            const actualVal = await rowNavi.locator(configLocator).inputValue()
            expect.soft(actualVal).toEqual(expectedVal)
        }
        else{
            const actualVal = await rowNavi.locator(configLocator).textContent()
            expect.soft(actualVal).toEqual(expectedVal)
        } 
    }
}