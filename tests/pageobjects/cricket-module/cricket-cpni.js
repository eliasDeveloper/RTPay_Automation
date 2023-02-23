class cricketCPNI {
	get readMessagesCheckbox(){ return '.v-input--selection-controls__ripple' }
    get yesIdPresentedButton(){ return '#inspire div:nth-child(2) > div div div> button.marr10.float-left' }
    get authorizedUserName(){ return '#inspire div.app-content div > div:nth-child(3) > div > div > div> div > div > h1'}
    get confirmationPinInput(){ return '#input-571'}
    get confirmationPinErrorMessage(){ return '#inspire div.app-content  div > div:nth-child(4) > div > div > div> div:nth-child(2) > div'}
    get submitPinButton(){return '#inspire div.app-content div > div:nth-child(4) > div > div > div:nth-child(2) > button.v-btn.v-btn--is-elevated'}
    get customerCPNICheckbox(){ return 'div:nth-child(5)  .v-input--selection-controls__ripple'}
    get federalLawMessage(){return '#inspire main div.app-content div:nth-child(5) > div.v-stepper__content div.row.padl10 > h4'}
    get yesConsentGrantedButton(){ return '#inspire main div:nth-child(5) > div.v-stepper__content > div > button.marr10.float-left'}
}
module.exports = new cricketCPNI()