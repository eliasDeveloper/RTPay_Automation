const { test, expect } = require("@playwright/test")
const helper = require('../../utilities/helper')
const securityQaFeature = require('../../pageobjects/cricket-module/security-qa')
const loginPage = require('../../pageobjects/login-module/login-page')
require('dotenv').config()

test.describe("Security QA Test", () => {
    let username = 'homebrewqa', password = 'Qmanager1', randomText = '', phoneNumber = '3052992462', randomNumber=0
    const isProduction = process.env.isProduction
    test.beforeEach(async ({ page }) => {
        if(isProduction == true){
            await page.goto(process.env.PRODUCTION_URL)
        }
        else{
            await page.goto(process.env.TEST_URL)
        }
        await loginPage.loginToRTPay(page, username, password)
    })
    test("Test Case 60851: Should be able to send an email to the customer to reset the security QA.", async ({ page }) => {
        await expect(page.locator(securityQaFeature.securityQAicon)).toBeVisible()
        await page.locator(await securityQaFeature.securityQAicon).click();
        await page.getByRole('button', { name: 'Select' }).click();
        await expect(page.locator(securityQaFeature.cricketoption)).toBeVisible()
        await page.locator(securityQaFeature.cricketoption).click()
        await page.getByLabel('Enter Wireless Number').fill(phoneNumber)
        await expect(page.getByRole('button', { name: 'Reset Security QA' })).toBeEnabled()
        await page.getByRole('button', { name: 'Reset Security QA' }).click()
        //make sure that the message throwin is correct
        await expect(await page.getByText('Request to Reset Security QA Successful')).toHaveText('Request to Reset Security QA Successful')
    })
    test("Test case: 60852 : Should not be able to send an email to an invalid customer phone number", async ({ page }) => {
        await expect(page.locator(securityQaFeature.securityQAicon)).toBeVisible()
        await page.locator(await securityQaFeature.securityQAicon).click();
        await page.getByRole('button', { name: 'Select' }).click();
        await expect(page.locator(securityQaFeature.cricketoption)).toBeVisible()
        await page.locator(securityQaFeature.cricketoption).click()
        randomNumber = await helper.generateRandomAmericanNumber()
        await page.getByLabel('Enter Wireless Number').fill(randomNumber.toString())
        await expect(page.getByRole('button', { name: 'Reset Security QA' })).toBeEnabled()
        await page.getByRole('button', { name: 'Reset Security QA' }).click()
        //make sure that the error message thrown has the correct text
        await expect(page.getByText("Phone number" + randomNumber.toString() + "is not associated with cricket wireless")).toBeVisible()
    })
    test("Test Case 60873: Should not be able to enter characters of type string in the wireless phone number field.", async ({ page }) => {
        await expect(page.locator(securityQaFeature.securityQAicon)).toBeVisible()
        await page.locator(await securityQaFeature.securityQAicon).click()
        await page.getByRole('button', { name: 'Select' }).click()
        await expect(page.locator(securityQaFeature.cricketoption)).toBeVisible()
        await page.locator(securityQaFeature.cricketoption).click()
        const checkForString = await page.getByLabel('Enter Wireless Number')
        randomText =await helper.generateRandomText(10)
        // enter a non-numeric value into the field
        await checkForString.fill(randomText);
        // Get the value of the input field
        await expect(page.getByText('Wireless Number must be valid')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Reset Security QA' })).toBeDisabled()
    })
})












