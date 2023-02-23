const {expect} = require("@playwright/test")
require('dotenv').config()

class loginPage {
	get password(){ return '#Password'}
    get signInBtn(){ return 'role=button[name="Sign In"]'}
    get email(){ return 'internal:attr=[placeholder="Username"i]'}

    async loginToRTPay(page, username, pass){
        await expect(page).toHaveURL("https://1sso.qpay123.biz/Home/Authorize")
        await expect(await page.locator(this.email)).toBeVisible()
        await expect(await page.locator(this.password)).toBeVisible()
        await expect(await page.locator(this.signInBtn)).toBeVisible()
        await page.locator(this.email).click()
        await page.locator(this.email).type(username)
        await page.locator(this.password).click()
        await page.locator(this.password).type(pass)
        await page.locator(this.signInBtn).click()
        process.env.isProduction == true ? await expect(page).toHaveURL(process.env.PRODUCTION_URL)
        : await expect(page).toHaveURL(process.env.TEST_URL)
    }
}
module.exports = new loginPage()