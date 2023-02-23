export const generateRandomText = (length) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
export const generateRandomAmericanNumber = ()=>{
	let randomNumber = Math.floor(Math.random() * 10000000000);
	return randomNumber;
}
export const generateBiggerNumberThanAllowed = (number)=>{
	let randomNumberMax = Math.floor(Math.random() * 8000) + number;
	return randomNumberMax;
}

