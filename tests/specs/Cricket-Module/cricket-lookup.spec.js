const { test, expect } = require("@playwright/test")
const cricketActivation = require('../../pageobjects/cricket-module/cricket-activation')
const loginPage = require('../../pageobjects/login-module/login-page')
const helper = require('../../utilities/helper')
require('dotenv').config()
test.describe("Activation Test for Cricket", () => {
        let username = 'breakers', password = 'Miami1234', firstN = 'zahraa', lastN = 'hammoud', address = '3250 MARY ST', email = 'z.hamoud75@gmail.com', phoneNumber = '1234567890', city = 'MIAMI', zipCode = '33133'
        const simcard = '8901240177181744430', zipcode = '33133', imei = '123456123456123'
        let randomNumberMax = 0
        let page = null
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
            

        })