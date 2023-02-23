class cricketActivation {
    get cricketIcon(){ return "//div[@class='v-slide-group__wrapper']//div[2]//div[1]"}
    get firstName(){return '#first-name'}
    get lastName(){return '#last-name'}
    get address(){return '#address'}
    get email(){return '#email'}
    get city(){return '#city'}
    get phone(){return '#phone'}
    get zipCode(){return '#zipCode'}
    get englishLanguage(){return '#list-item-219-1 > div'}
    get spanishLanguage(){return '#list-item-219-0 > div'}
    get state(){return '#list-item-222-13 > div > div'}
    get confirmAddressButton(){return '#confirm-address-accept-btn'}
    get cricketImei(){return '#imei'}
    get cricketSim(){return '#sim'}
    get cancelButton(){return "button[data-cy='cancel-button-product-select']"}
    get reviewAcceptButton(){return "//button[@data-cy='review-and-accept-button']"}
    get esimIcon(){return "//span[contains(text(),'-SIM')]"}
    get fullPlanDetails(){return '#productDetails6960 > div > div.v-card__text > h5'}
    get selectThisPlanButton(){return "//button[@class='primary text-capitalize v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default']"}
    get pickSomethingElseButton(){return "button[class='text-capitalize v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default']"}
    get checkBoxForTerms(){return "(//div[@class='v-input--selection-controls__ripple'])[2]"}
    get paymentType(){return '#input-1582'}
    get amountReceived(){return '#input-1587'}
    get placeOrderPayButton(){return "button[type='button'][data-cy='payment-btn']"}
    get totalAmountCharge(){return "span[class='float-right']"}
    get changeDue(){return "span[data-cy='change-due']"}
    get esimToggle(){return "div[class='row justify-left'] div[class='v-input--selection-controls__ripple']"}
    get esimIndicator(){return "(//div[@class='black--text font-weight-medium pt-2 col col-1'])[3]"}
}
module.exports = new cricketActivation()