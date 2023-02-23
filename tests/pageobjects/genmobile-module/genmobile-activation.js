class genmobileActivation {
	get genmobileActivationIcon(){ return 'div.app-content > div  div:nth-child(3) > div'}
	get portInNumberToggleButton(){ return '.v-input--selection-controls__ripple'}
	get imeiInput(){ return '#input-105'}
	get zipCodeInput(){ return '#input-108'}
	get firstActivationFullPlanDetails(){ return '#productDetails202655 > div h5'}
	get cityField(){ return 'div:nth-child(2) div:nth-child(4) > div> div > div > div:nth-child(1) > div > div:nth-child(1) div:nth-child(2) > div.pt-1 > span'}
	get stateField(){ return 'div:nth-child(2) div:nth-child(4) > div> div > div > div:nth-child(1) > div > div:nth-child(1) div:nth-child(3) > div.pt-1 > span' }
	get simCardField(){ return 'div:nth-child(2) div:nth-child(4) > div> div > div > div:nth-child(1) > div > div:nth-child(2) div:nth-child(2) > div.pt-1 > span'}
	get imeiField(){ return 'div:nth-child(2) div:nth-child(4) > div> div > div > div:nth-child(1) > div > div:nth-child(2) div:nth-child(3) > div.pt-1 > span'}
	get zipCodeField(){ return 'div:nth-child(2) div:nth-child(4) > div> div > div > div:nth-child(1) > div > div:nth-child(2) div:nth-child(4) > div.pt-1 > span'}
	get paymentType(){ return '#list-item-329-0'}
}
module.exports = new genmobileActivation()