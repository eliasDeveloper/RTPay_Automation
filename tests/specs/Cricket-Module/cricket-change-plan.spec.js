const { test, expect } = require("@playwright/test")
const cricketCPNI =  require('../../pageobjects/cricket-module/cricket-cpni')
const cricketChangePlan =  require('../../pageobjects/cricket-module/cricket-changeplan')
const loginPage = require('../../pageobjects/login-module/login-page')
const helper = require('../../utilities/helper')
require('dotenv').config()

test.describe('Cricket Change Plan Automation Test', async()=>{
    let page = null
    let username = 'breakers', password = 'Miami1234', cricketNumber = '3055107750', pin = '1111'
    const isProduction = process.env.isProduction
    test.beforeAll(async({browser})=>{
        page = await browser.newPage()
    })
    test('Test Case 60552: Should be able to login successfully with the right credentials.',async () => {
        if(isProduction == true){
            await page.goto(process.env.PRODUCTION_URL)
        }
        else{
            await page.goto(process.env.TEST_URL)
        }
        await loginPage.loginToRTPay(page, username, password)
    })
    test('Test Case 61157: Should not be able to proceed the lookup with a wrong cricket number', async()=>{
        await page.getByRole('button', { name: 'Customer Lookup' }).click()
        await page.getByLabel('Select').click()
        await page.getByRole('option', { name: 'Cricket' }).locator('div').first().click()
        await page.getByLabel('Enter Wireless Number').click()
        const randomAmericanNumber = await helper.generateRandomAmericanNumber()
        await page.getByLabel('Enter Wireless Number').fill(randomAmericanNumber)
        await page.getByRole('button', { name: 'Search for Customer' }).click()
        await expect(page).toHaveURL('https://1connect.incommagentsolutions.biz/#/')
    })
    test('Test Case 60271: Should be able to search for a Cricket number.', async()=> {
        await page.getByRole('button', { name: 'Customer Lookup' }).click()
        await page.getByLabel('Select').click()
        await page.getByRole('option', { name: 'Cricket' }).locator('div').first().click()
        await page.getByLabel('Enter Wireless Number').click()
        await page.getByLabel('Enter Wireless Number').fill(cricketNumber)
        await page.getByRole('button', { name: 'Search for Customer' }).click()
        await expect(page).toHaveURL(`https://1connect.incommagentsolutions.biz/cricket/#/lookup/${cricketNumber}/`)
        await expect(await page.locator(await cricketCPNI.readMessagesCheckbox)).toBeVisible()
        await expect(await page.locator(await cricketCPNI.yesIdPresentedButton)).toBeDisabled()
    })
    test('Test Case 60272: Should be able to validate the ID presentation.', async()=> {
        await page.locator(await cricketCPNI.readMessagesCheckbox).first().click()
        await page.getByRole('button', { name: 'Yes, I.D. Presented' }).click()
        await expect(await page.getByText('Validate Customer Identity')).toHaveText('Validate Customer Identity')
        await expect(await page.locator(await cricketCPNI.authorizedUserName)).toBeVisible()
    })
    test('Test Case 60273: Should be able to validate the customer identity.', async()=> {
        await page.getByRole('button', { name: 'Yes, I.D. Matched' }).click()
        await expect(await page.locator(await cricketCPNI.confirmationPinInput)).toBeEnabled()
        await expect(await page.locator(await cricketCPNI.confirmationPinInput)).toBeVisible()
        await expect(await page.locator(await cricketCPNI.submitPinButton)).toBeDisabled()
    })
    test('Test Case 60274: Should be able to validate the one time pin.', async()=> {
        await page.locator(await cricketCPNI.confirmationPinInput).fill('111')
        await expect(await page.locator(await cricketCPNI.confirmationPinErrorMessage)).toHaveText('Security PIN must have 4 characters')
        await page.locator(await cricketCPNI.confirmationPinInput).fill(pin)
        await expect(await page.locator(await cricketCPNI.submitPinButton)).toBeEnabled()
        await page.locator(await cricketCPNI.submitPinButton).click()
    })
    test('Test Case 60299: Should be able to Confirm CPNI Attestation.', async()=> {
        await expect(await page.locator(await cricketCPNI.federalLawMessage)).toBeVisible()
        await expect(await page.locator(await cricketCPNI.yesConsentGrantedButton)).toBeDisabled()
        await expect(await page.locator(await cricketCPNI.federalLawMessage)).toHaveText('Under federal privacy law, it is your right and our duty to protect your account information. May I use your information during this visit to discuss other products and services. Your decision will not affect your service.')
        await page.locator(await cricketCPNI.customerCPNICheckbox).click()
        await expect(await page.locator(await cricketCPNI.yesConsentGrantedButton)).toBeEnabled()
    })
    test('Test Case 61513: Should be able to click on the Change Plan button from the account details page', async()=> {
        await expect(page).toHaveURL('https://connect.incommagentsolutions.com/cricket/#/accountdetails')
        await page.locator(await cricketChangePlan.changePlanButton).click()
        await expect(page).toHaveURL(`https://connect.incommagentsolutions.com/cricket/#/changeplan/${cricketNumber}/`)
        await expect(page.locator(await cricketChangePlan.planChangeConfirmationButton)).toBeDisabled()
    })
    test('Test Case 61496: Should not be able to choose same plan as previous one.', async()=> {
        await expect(page.locator(await cricketChangePlan.planChangeConfirmationButton)).toBeDisabled()
        await expect(page.locator(await cricketChangePlan.planChangeConfirmationButton)).toBeVisible()
    })
    test('Test Case 61134: Should be able to select a new plan from the options displayed.', async()=> {
        await page.locator('i').first().click()
        await page.locator('i').first().click()
        await page.locator('i').first().click()
        await page.locator(await cricketChangePlan.fullPlanDetails).first().click()
        await expect(page.locator(await cricketChangePlan.selectThisPlanButton)).toBeVisible()
        await expect(page.locator(await cricketChangePlan.pickSomethingElseButton)).toBeVisible()
        await page.locator(await cricketChangePlan.selectThisPlanButton).click()
        await expect(page.locator(await cricketChangePlan.planChangeConfirmationButton)).toBeEnabled()
        await expect(page.locator(await cricketChangePlan.planChangeConfirmationButton)).toBeVisible()
        await expect(await page.getByText('NEW SELECTED PLAN')).toBeVisible()
    })
    test('Test Case 61144: Should be able to confirm the change.', async()=> {
        await expect(await page.locator(await cricketChangePlan.confirmChangeButton)).toBeVisible()
        await expect(await page.locator(await cricketChangePlan.confirmChangeButton)).toBeEnabled()
        await page.locator(await cricketChangePlan.confirmChangeButton).click()
        await expect(await page.locator(await cricketChangePlan.completeOrderButton)).toBeVisible()
        await expect(await page.locator(await cricketChangePlan.completeOrderButton)).toBeDisabled()
        await expect(await page.locator(await cricketChangePlan.checkboxTermsAndConditions)).toBeVisible()
        await expect(await page.locator(await cricketChangePlan.checkboxTermsAndConditions)).toBeEnabled()
    })
    test('Test Case 61136: Should be able to agree on terms and conditions and complete order.', async()=> {
        await page.locator(await cricketChangePlan.checkboxTermsAndConditions).click()
        await expect(await page.locator(await cricketChangePlan.completeOrderButton)).toBeVisible()
        await expect(await page.locator(await cricketChangePlan.completeOrderButton)).toBeEnabled()
        await page.locator(await cricketChangePlan.completeOrderButton).click()
    })
    test('Test Case 61142: Should not be able to pay without specifying payment type.', async()=>{
        await expect(await page.locator(await cricketChangePlan.placeOrderPay)).toBeDisabled()
        await expect(await page.locator(await cricketChangePlan.placeOrderPay)).toBeVisible()
    })
    test('Test Case 61140: Should not be able to input payment amount more than 2000.',async()=>{
        await page.getByPlaceholder('Select Payment Type').click()
        await page.locator(await cricketChangePlan.paymentTypeList).getByText('Cash').click()
        await page.getByPlaceholder('Enter Amount Received').fill('2001');
        await expect(await page.getByText('The amount received must be less than 2000')).toBeVisible()
        await expect(await page.locator(await cricketChangePlan.placeOrderPay)).toBeDisabled()
    })
    test('Test Case 61141: Should not be to input negative amount for payment.',async()=>{
        await page.getByPlaceholder('Enter Amount Received').fill('')
        await page.getByPlaceholder('Enter Amount Received').fill('-1')
        expect(await page.getByText('The amount received must be equal to or greater than the amount due')).toBeVisible()
        await expect(await page.locator(await cricketChangePlan.placeOrderPay)).toBeDisabled()
    })
    test('Test Case 61139: Should be able to pay - Payment', async()=> {
        await page.getByPlaceholder('Select Payment Type').click()
        await page.getByText('CashBack').click()
        expect(await page.locator(await cricketChangePlan.paymentAmountInput)).toBeDisabled()
        await expect(await page.locator(await cricketChangePlan.placeOrderPay)).toBeEnabled()
        await page.locator(await cricketChangePlan.placeOrderPay).click()
    })
})