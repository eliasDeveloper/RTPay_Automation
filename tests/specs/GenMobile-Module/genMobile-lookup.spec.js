const {test, expect} = require("@playwright/test")
const helper = require('../../utilities/helper')
const loginPage = require('../../pageobjects/login-module/login-page')
require('dotenv').config()

test.describe("Lookup Test for GenMobile", ()=>{
    let page = null
    let username ='j1', password = 'Miami1234', phoneNumber = '(305)342-2145', mobileNumber ='3053422145'
    const isProduction = process.env.isProduction
    test.beforeAll(async({browser})=>{
        page = await browser.newPage()
    })
    test('Test Case 60552: Should be able to login successfully with the right credentials.', async()=>{
        if(isProduction == true){
            await page.goto(process.env.PRODUCTION_URL)
        }
        else{
            await page.goto(process.env.TEST_URL)
        }
        await loginPage.loginToRTPay(page, username, password)
    })
    test('Test Case 60032: Should be able to search for a GenMobile number.',async()=>{
        await expect(page.getByRole('button', { name: 'Customer Lookup' })).toBeVisible();
        await page.getByRole('button', { name: 'Customer Lookup' }).click();
        await expect(page.getByRole('menu').getByRole('img', { name: 'Customer Lookup' })).toBeVisible();
        await expect(page.getByLabel('Select')).toBeVisible()
        await expect(page.getByLabel('Select')).toBeEnabled()
        await page.getByLabel('Select').click();
        await page.getByText('Gen Mobile').click();
        const searchForCustomerLocator = await page.getByRole('button', { name: 'Search for Customer' })
        await expect(searchForCustomerLocator).toBeDisabled();
        await page.getByLabel('Enter Wireless Number').click();
        await page.getByLabel('Enter Wireless Number').fill(phoneNumber);
        await expect(page).toHaveURL("https://1connect.incommagentsolutions.biz/genmobile/#/lookup/"+mobileNumber);
    })
    
    test('Test Case 60060: Should be able to select a plan from the Plan Information section.',async()=>{
        await page.locator('#productDetails202662').getByText('SELECT PLAN').click();
        await expect(page.getByRole('button', { name: 'Back' }).first()).toBeVisible()
        await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible()
        
    })
    test('Test Case 60100: Should be able to confirm plan selection',async()=>{
        await expect(page.getByRole('button', { name: 'CONFIRM CHANGE' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'CONFIRM CHANGE' })).toBeEnabled()
        await page.getByRole('button', { name: 'CONFIRM CHANGE' }).click();
    })
    test('Test Case 60061: Should be able to accept the terms and conditions and make a payment.',async()=>{
        await expect(await page.getByRole('heading', { name: 'REVIEW TERMS & CONDITIONS WITH CUSTOMER' })).toHaveText('REVIEW TERMS & CONDITIONS WITH CUSTOMER')
        await expect(await page.getByText('I have read the following information to the customer. Customer Accepts.')).toHaveText('I have read the following information to the customer. Customer Accepts.')
        await expect(page.locator('.v-input--selection-controls__ripple')).toBeVisible()
        await page.locator('.v-input--selection-controls__ripple').click();
    })
    test('Test Case 60077: Should not be able to search for GenMobile number in non-GenMobile carrier.',async()=>{
        await page.getByRole('button', { name: 'Select Gen Mobile' }).click();
        await page.getByText('Cricket').click();
        await page.getByLabel('Enter Wireless Number').click();
        await page.getByLabel('Enter Wireless Number').fill(phoneNumber);
        await expect(page.getByRole('button', { name: 'Search for Customer' })).toBeEnabled()
        await page.getByRole('button', { name: 'Search for Customer' }).click();
        await expect(page.getByRole('heading', { name: 'System failure!' })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'System failure!' })).toHaveText('System failure!')
    })
})