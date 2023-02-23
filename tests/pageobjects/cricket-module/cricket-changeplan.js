class cricketChangePlan{
    get changePlanButton(){ return 'div> button:nth-child(8)'}
    get planChangeConfirmationButton(){ return '#inspire div:nth-child(1) > div.v-stepper__content button.v-btn.v-btn--disabled.v-btn--has-bg.theme--light'}
    get fullPlanDetails(){ return '#allProductsundefined > div > div > div.v-card__text > div:nth-child(4) > h5'}
    get selectThisPlanButton(){ return '#inspire button.primary.text-capitalize.v-btn'}
    get pickSomethingElseButton(){return '#inspire > div.v-dialog__content div.pa-2 > div.v-card__actions > div > button:nth-child(2)'}
    get confirmChangeButton(){ return '#inspire div:nth-child(2) > div:nth-child(2) div > div > div.row > div:nth-child(1) > button'}
    get checkboxTermsAndConditions(){ return '#input-657'}
    get completeOrderButton(){return '#inspire div:nth-child(2) > div > div > div > div:nth-child(3) div.row > div:nth-child(1) > button'}
    get paymentTypeList(){return '#list-item-538-0'}
    get placeOrderPay(){ return '#inspire div > div.app-content div div.text-center.mt-8 > button'}
    get paymentAmountInput(){return '#input-533'}

}
module.exports = new cricketChangePlan()