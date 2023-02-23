const {test, expect} = require("@playwright/test")
const helper = require('../../utilities/helper')
const genmobileActivation =  require('../../pageobjects/genmobile-module/genmobile-activation')
const loginPage = require('../../pageobjects/login-module/login-page')
require('dotenv').config()

test.describe("Activation Test for GenMobile", ()=>{
    let page = null
    let username ='j1', password = 'Miami1234', randomText = ''
    const simcard = '8901240177181744430', zipcode = '33133', imei= '123456123456123'
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
    test('Test Case 60676: Should be able to access the GenMobile module.', async()=>{
        await page.locator(await genmobileActivation.genmobileActivationIcon).click()
        await expect(page).toHaveURL('https://1connect.incommagentsolutions.biz/genmobile/')
        await expect (page.getByRole('heading', { name: 'New Activation' })).toBeVisible()
        await expect(await page.getByRole('heading', { name: 'Purchase Details 0' }).getByText('0')).toBeVisible()
        await expect(await page.getByLabel('City')).toBeVisible()
        await expect(await page.getByLabel('State')).toBeVisible()
        await expect(await page.getByLabel('City')).toBeEnabled()
        await expect(await page.getByLabel('State')).toBeEnabled()
        await expect(await page.getByRole('button', { name: 'Now, Setup Device' })).toBeEnabled()
        await expect(await page.getByRole('button', { name: 'Now, Setup Device' })).toBeVisible()
    })
    test('Test Case 60683: Should be able to set an account.',async()=>{
        await page.getByLabel('City').click()
        randomText = await helper.generateRandomText(7)
        await page.locator('#input-82').fill(randomText)
        await page.getByLabel('State').click()
        await page.getByRole('option', { name: 'Florida' }).getByText('Florida').click()
        await page.getByRole('button', { name: 'Now, Setup Device' }).click()
        await expect(await page.getByLabel('SIM')).toBeVisible()
        await expect(await page.getByLabel('IMEI')).toBeVisible()
        await expect(await page.getByLabel('ZipCode')).toBeVisible()
        await expect(await page.getByLabel('SIM')).toBeEnabled()
        await expect(await page.getByLabel('IMEI')).toBeEnabled()
        await expect(await page.getByLabel('ZipCode')).toBeEnabled()
        await expect(await page.getByLabel('ZipCode')).toBeEmpty()
        await expect(await page.getByRole('button', { name: 'Continue' }).click()).toBeVisible()
        await expect(await page.locator(await genmobileActivation.portInNumberToggleButton).first()).toBeVisible()
    })
    test('Test Case 60684: Should be able to setup the Device Information.',async()=>{
        await page.getByLabel('SIM').click()
        await page.getByLabel('SIM').fill(simcard)
        await page.getByLabel('IMEI').click()
        await page.locator(await genmobileActivation.imeiInput).fill(imei)
        await page.getByLabel('ZipCode').click()
        await page.locator(await genmobileActivation.zipCodeInput).fill(zipcode)
        await page.getByRole('button', { name: 'Continue' }).click()
        await expect(await page.locator(await genmobileActivation.firstActivationFullPlanDetails)).toBeVisible()

    })
    test('Test Case 60685: Should be able to select a plan - Plan Selection.',async()=>{
        await page.locator(await genmobileActivation.firstActivationFullPlanDetails).click()
        await page.getByRole('button', { name: 'Select this Plan' }).click();
        await expect(await page.locator('span').filter({ hasText: '$10.00' })).toBeVisible()
        await expect(await page.getByRole('heading', { name: '$10 Plan Disclaimer. Must Read Out Loud.' })).toBeVisible()
        await expect(page.getByText('I have read the above information to the customer.')).toBeVisible()
        await page.getByText('I have read the above information to the customer.').click()
        await page.getByRole('button', { name: 'Review & Accept' }).click()
    })
    test('Test Case 60687: Should be able to Review and Accept the terms.',async()=>{
        await expect(await page.locator(await genmobileActivation.cityField)).toHaveText(randomText)
        await expect(await page.locator(await genmobileActivation.stateField)).toHaveText('Florida')
        await expect(await page.locator(await genmobileActivation.imeiField)).toHaveText(imei)
        await expect(await page.locator(await genmobileActivation.simCardField)).toHaveText(simcard)
        await expect(await page.locator(await genmobileActivation.zipCodeField)).toHaveText(zipcode)
        await page.getByText('I have read the following information to the customer.').click();
    })
    test('Test Case 60688: Should be able to pay - Payment.',async()=>{
        await page.getByLabel('Payment Type').scrollIntoViewIfNeeded()
        await page.getByLabel('Payment Type').click()
        await page.locator(await genmobileActivation.paymentType).getByText('Cash').click()
        await page.getByPlaceholder('Enter Amount Received').fill('')
        await expect(await page.getByText('The Amount Received is required')).toHaveText('The Amount Received is required')
        await page.getByPlaceholder('Enter Amount Received').fill('10')
        await expect(await page.getByRole('button', { name: 'Place Order & Pay' })).toBeVisible()
        await expect(await page.getByRole('button', { name: 'Place Order & Pay' })).toBeEnabled()
        await page.getByRole('button', { name: 'Place Order & Pay' }).click()
        await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Loading...One moment...' }).nth(2)).toBeVisible()
        await expect(page).toHaveURL('https://1connect.incommagentsolutions.biz/genmobile/#/confirmation')
    })
})