const {test, expect} = require("@playwright/test")
const helper = require('../../utilities/helper')
let username ='', password = ''
let randomString = ''
test.describe("Navigation to RTPay and accept the certificate manually", ()=>{
    test.beforeEach(async({ page})=>{
        await page.goto("https://1connect.incommagentsolutions.biz/#/")
    })
    test('Login to RTPay with wrong credentials', async({ page })=>{
        username = 'j2'
        password = await helper.generateRandomText(5)
        await expect(page).toHaveURL("https://1sso.qpay123.biz/Home/Authorize")
        const email = await page.locator('internal:attr=[placeholder="Username"i]')
        await expect(email).toBeVisible()
        const pass = await page.locator('#Password')
        await expect(pass).toBeVisible()
        const signInButton = await page.locator('role=button[name="Sign In"]')
        await expect(signInButton).toBeVisible()
        await email.click()
        await email.type(username)
        await pass.click()
        await pass.type(password)
        await signInButton.click()
        await expect(page.locator('#validationSummary')).toBeVisible()
    })
    test("Login to RTPay", async({page})=>{
        username = 'j1'
        password = 'Miami123'
        await expect(page).toHaveURL("https://1sso.qpay123.biz/Home/Authorize")
        const email = await page.locator('internal:attr=[placeholder="Username"i]')
        await expect(email).toBeVisible()
        const pass = await page.locator('#Password');
        await expect(pass).toBeVisible()
        const signInButton = await page.locator('role=button[name="Sign In"]')
        await expect(signInButton).toBeVisible()
        await email.click()
        await email.type(username)
        await pass.click()
        await pass.type(password)
        await signInButton.click()
        await expect(page).toHaveURL('https://1connect.incommagentsolutions.biz/#/')
    })
})