const { test, expect } = require("@playwright/test")
const cricketActivation = require('../../pageobjects/cricket-module/cricket-activation')
const loginPage = require('../../pageobjects/login-module/login-page')
const helper = require('../../utilities/helper')
require('dotenv').config()
test.describe("Activation Test for Cricket -  PSIM", () => {
        let username = 'breakers', password = 'Miami1234', firstName = 'zahraa', lastName = 'hammoud', address = '3250 MARY ST', email = 'z.hamoud75@gmail.com', phoneNumber = '1234567890', city = 'MIAMI'
        const simcard = '8901240177181744430', zipcode = '33133', imei = '123456123456123'
        let randomNumberMax = 0
        let page = null
        const isProduction = process.env.isProduction
        test.beforeAll(async ({ browser }) => {
                page = await browser.newPage()
        })
        test('Test Case 60552: Should be able to login successfully with the right credentials.', async () => {
                if (isProduction == true) {
                        await page.goto(process.env.PRODUCTION_URL)
                }
                else {
                        await page.goto(process.env.TEST_URL)
                }
                await loginPage.loginToRTPay(page, username, password)
        })
        //account setup step start
        test('Test Case 60297: Should be able to access the Activation page of Cricket.', async ({ }) => {
                await expect(page.locator(cricketActivation.cricketIcon)).toBeVisible()
                await page.locator(await cricketActivation.cricketIcon).click()
                //await expect(page).toHaveURL('https://1connect.incommagentsolutions.biz/cricket/#/activation')
                await expect(page.getByRole('heading', { name: 'New Line Activation' })).toBeVisible()
                //checking cricket icon is visible in the new activation page
                await expect(page.getByRole('main').getByRole('img')).toBeVisible()
                //checking fn & ln fields are visible and enabled
                await expect(page.locator(cricketActivation.firstName)).toBeEnabled()
                await expect(page.locator(cricketActivation.firstName)).toBeVisible()
                await expect(page.locator(cricketActivation.lastName)).toBeVisible()
                await expect(page.locator(cricketActivation.lastName)).toBeEnabled()
                //checking address & city fields are visible and enabled
                await expect(page.locator(cricketActivation.address)).toBeVisible()
                await expect(page.locator(cricketActivation.address)).toBeEnabled()

                //checking city and zipcode fields are visible & enabled
                await expect(page.locator(cricketActivation.city)).toBeVisible()
                await expect(page.locator(cricketActivation.city)).toBeEnabled()
                await expect(page.locator(cricketActivation.zipCode)).toBeVisible()
                await expect(page.locator(cricketActivation.zipCode)).toBeEnabled()
                //checking email and phone fields are visible and enabled
                await expect(page.locator(cricketActivation.email)).toBeVisible()
                await expect(page.locator(cricketActivation.email)).toBeEnabled()
                await expect(page.locator(cricketActivation.phone)).toBeVisible()
                await expect(page.locator(cricketActivation.phone)).toBeEnabled()
                //checking cancel button is visible and enabled
                await expect(page.getByRole('button', { name: 'Cancel' }).first()).toBeVisible()
                await expect(page.getByRole('button', { name: 'Cancel' }).first()).toBeEnabled()
                //checking continue button is visible
                await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible()
        })
        test('Test Case 60298: Should not be able to proceed from the Account Setup without filling all the required fields.', async ({ }) => {
                await page.locator(cricketActivation.firstName).fill(firstName)
                await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled()
        })
        test('Test Case 60885: Should not be able to input wrong phone number format.', async ({ }) => {
                randomNumberMax = await helper.generateBiggerNumberThanAllowed(2001)
                await page.locator(cricketActivation.phone).fill(randomNumberMax.toString())
                await expect(page.getByText('Phone Number must be valid')).toBeVisible()
                await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled()
        })
        test('Test Case 60886: Should not be able to input wrong email format.', async ({ }) => {
                await page.locator(cricketActivation.email).fill('zzzz')
                await expect(page.getByText('Email must be valid')).toBeVisible()
                await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled()
        })
        test('Test Case 60554: Should be able to set an account for Cricket.', async ({ }) => {
                await page.getByLabel('Language Preference').click()
                await expect(page.locator(cricketActivation.englishLanguage)).toBeVisible()
                await expect(page.locator(cricketActivation.spanishLanguage)).toBeVisible()
                await page.locator(cricketActivation.englishLanguage).click()
                await page.locator(cricketActivation.firstName).fill(firstName)
                await page.locator(cricketActivation.lastName).fill(lastName)
                await page.locator(cricketActivation.address).fill(address)
                await page.locator(cricketActivation.email).fill(email)
                await page.locator(cricketActivation.city).fill(city)
                await page.locator(cricketActivation.phone).fill(phoneNumber)
                await page.locator(cricketActivation.zipCode).fill(zipcode)
                await page.getByRole('button', { name: 'State' }).click()
                await page.getByText('Florida').click()
                //await expect(page.locator(cricketActivation.state)).toBeVisible()
                //await page.locator(cricketActivation.state).click()
                await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled()
                await page.getByRole('button', { name: 'Continue' }).click()
                await expect(page.getByRole('dialog').getByRole('button', { name: 'Cancel' })).toBeVisible()
                await expect(page.locator(cricketActivation.confirmAddressButton)).toBeVisible()
                await page.locator(cricketActivation.confirmAddressButton).click()
        })
        //account setup step end
        //Device information step start
        test('Test Case 60922: Should not be able to proceed without filling all the required fields, like SIM and IMEI.', async ({ }) => {
                await page.locator(cricketActivation.cricketImei).click()
                await page.locator(cricketActivation.cricketSim).click()
                await expect(page.getByText('Imei is needed')).toHaveText('Imei is needed')
                await page.locator(cricketActivation.cricketImei).click()
                await expect(page.getByText('Sim must have 20 characters')).toHaveText('Sim must have 20 characters')
        })
        test('Test Case 60921: Should not be able to input an IMEI less than or greater than 15 chars.', async ({ }) => {
                await page.locator(cricketActivation.cricketImei).fill('323')
                await page.locator(cricketActivation.cricketSim).fill('233')
                await expect(page.getByRole('alert').filter({ hasText: 'Imei must have 15 characters' })).toBeVisible()
                await expect(page.getByText('Sim must have 20 characters')).toBeVisible()
                await expect(page.getByRole('button', { name: 'Now, Pick a Plan' })).toBeDisabled()
        })
        test('Test Case 60923: Should not be able to input a SIM number less or greater than 20 digits - strictly 20.', async ({ }) => {
                await page.locator(cricketActivation.cricketSim).fill('2344444444444444444444444444444444444444')
                await expect(page.getByText('Sim must have 20 characters')).toHaveText('Sim must have 20 characters')
        })
        test('Test Case 60890: Should be able to set the Device Information - PSIM', async ({ }) => {
                await page.locator(cricketActivation.cricketImei).clear()
                await page.locator(cricketActivation.cricketSim).clear()
                //filling the imei and sim
                await page.locator(cricketActivation.cricketImei).fill(imei)
                await page.locator(cricketActivation.cricketSim).fill(simcard)
                //checking if button is enabled
                await expect(page.getByRole('button', { name: 'Now, Pick a Plan' })).toBeVisible()
                await expect(page.getByRole('button', { name: 'Now, Pick a Plan' })).toBeEnabled()
                //clicking on the button
                await page.getByRole('button', { name: 'Now, Pick a Plan' }).click()
                //checking if the loader is visible
                await expect(page.getByRole('progressbar').locator('div').nth(1)).toBeVisible()
                //checking if now we are on the plan selection step
                await expect(page.getByRole('button', { name: 'Review & Accept' })).toBeDisabled()
                await expect(page.locator('#back-button')).toBeVisible()
                await expect(page.locator('#back-button')).toBeEnabled()
                await expect(page.locator(cricketActivation.cancelButton)).toBeVisible()
                await expect(page.locator(cricketActivation.cancelButton)).toBeEnabled()
                await expect(page.getByText('*You may be able to lower the monthly cost of your wireless service if you are eligible for the federal government’s Affordable Connectivity Program. cricketwireless.com/acp for details.')).toHaveText('*You may be able to lower the monthly cost of your wireless service if you are eligible for the federal government’s Affordable Connectivity Program. cricketwireless.com/acp for details.')
        })
        //device information step end
        //plan selection step start
        test('Test Case 60931: Should not be able to proceed with selecting plan without agreeing on the terms and conditions.', async ({ }) => {
                await expect(page.getByRole('button', { name: 'Complete Order' })).toBeDisabled()
                await expect(page.getByRole('button', { name: 'Add Additional Line' })).toBeDisabled()
        })
        test('Test Case 60925: Should be able to select a plan from the options displayed.', async ({ }) => {
                await page.locator(cricketActivation.fullPlanDetails).click()
                await expect(page.getByText('$30.00 LIMITED')).toHaveText('$30.00 LIMITED')
                await expect(page.locator(cricketActivation.pickSomethingElseButton)).toBeVisible()
                await expect(page.locator(cricketActivation.pickSomethingElseButton)).toBeEnabled()
                await expect(page.locator(cricketActivation.selectThisPlanButton)).toBeEnabled()
                await page.locator(cricketActivation.selectThisPlanButton).click()
                await page.locator(cricketActivation.reviewAcceptButton).click()
        })
        //plan selection step end
        //review and accept step starts
        test('Test Case 60934: Should be able to agree on terms and conditions and complete order.', async ({ }) => {
                await page.locator(cricketActivation.checkBoxForTerms).click()
                await expect(page.getByText('N/A')).toHaveText('N/A')
                await expect(page.getByRole('button', { name: 'Complete Order' })).toBeEnabled()
                await expect(page.getByRole('button', { name: 'Add Additional Line' })).toBeEnabled()
                await page.getByRole('button', { name: 'Complete Order' }).click()
                await expect(page.getByText('Loading...One moment...')).toBeVisible()
        })
        //review and accept step ends
        test('Test Case 60936: Should not be to input negative amount for payment.', async ({ }) => {
                await page.locator(cricketActivation.amountReceived).fill('-3')
                await expect(page.getByText('The amount received must be equal to or greater than the amount due')).toBeVisible()
        })
        test('Test Case 60937: Should not be able to input payment amount more than 2000.', async ({ }) => {
                randomNumberMax = await helper.generateBiggerNumberThanAllowed(2001)
                await page.locator(cricketActivation.amountReceived).fill(randomNumberMax.toString())
                await expect(page.getByText('The amount received must be less than 2000')).toBeVisible()
        })
        test('Test Case 60938: Should not be able to pay without specifying payment type.', async ({ }) => {
                await page.locator(cricketActivation.amountReceived).fill('30')
                await expect(page.locator(cricketActivation.placeOrderPayButton)).toBeDisabled()
        })
        test('Test Case 60939: Should not be able to pay without specifying payment amount..', async ({ }) => {
                await page.locator(cricketActivation.amountReceived).click()
                await expect(page.getByText('The Amount Received is required')).toBeVisible()
        })
        test('Test Case 60935: Should be able to pay - Payment', async ({ }) => {
                await page.locator(cricketActivation.paymentType).click()
                await expect(page.getByRole('button', { name: 'Cancel Order' })).toBeVisible()
                await expect(page.getByRole('button', { name: 'Cancel Order' })).toBeEnabled()
                await page.locator('#list-item-886-0').getByText('Cash').click()
                await page.locator(cricketActivation.amountReceived).click()
                await page.locator(cricketActivation.amountReceived).fill('30')
                await expect(page.locator(cricketActivation.placeOrderPayButton)).toBeEnabled()
                await expect(page.locator(cricketActivation.changeDue)).toBeVisible()
                await page.locator(cricketActivation.placeOrderPayButton).click()
                await expect(page.getByText('Loading...One moment...')).toBeVisible()
        })
})
