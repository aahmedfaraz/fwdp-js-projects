// =========================================================================================
// All DOM Elements
// =========================================================================================
const rateSourceCurr = document.getElementById('rate-source-curr'); 
const rateTargetCurr = document.getElementById('rate-target-curr'); 
const rateTargetAmount = document.getElementById('rate-target-amount');
const sourceFlag = document.getElementById('source-flag');
const targetFlag = document.getElementById('target-flag');
const sourceCurrency = document.getElementById('source-currency');
const targetCurrency = document.getElementById('target-currency');
const sourceCurrencyAmount = document.getElementById('source-currency-amount');
const targetCurrencyAmount = document.getElementById('target-currency-amount');
const swapButton = document.getElementById('swap');
const resetButton = document.getElementById('reset');

// =========================================================================================
// Required Variables
// =========================================================================================
let currentSourceCurrency = 'USD';
let currentTargetCurrency = 'PKR';
let currentTargetCurrencyRate = 0;
let currenctSourceCurrencyAmount = 1;
let currenctTargetCurrencyAmount = 0;

// =========================================================================================
// All Functions
// =========================================================================================
// 1 - Function to update all Data
const updateAllData = async (sourceCurrAmount, sourceCurr, tarCurr) => {
    currentSourceCurrency = sourceCurr;
    currentTargetCurrency = tarCurr;

    try {
        const response = await fetch(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${sourceCurr}&to=${tarCurr}&amount=1`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2ff5d441b3msh027a92a261ae509p1bac58jsn1206ca86cdeb',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        });

        const data = await response.json();
        currentTargetCurrencyRate = data.info.rate;

        updateCurrenctRateInstruction();
        updateTargetCurrencyAmount(sourceCurrAmount);
    } catch (err) {
        console.log('ERROR >> ', err);
    }
}

// 2 - Function to update target currency amount
const updateTargetCurrencyAmount = (currenctSourceCurrencyAmount) => {
    console.log(currentTargetCurrencyRate, currenctSourceCurrencyAmount);
    targetCurrencyAmount.value = (currentTargetCurrencyRate * currenctSourceCurrencyAmount).toFixed(3);
};

// 3 - Function to update currenct rate instruction
const updateCurrenctRateInstruction = () => {
    rateSourceCurr.innerHTML = currentSourceCurrency;
    rateTargetCurr.innerHTML = currentTargetCurrency;
    rateTargetAmount.innerHTML = currentTargetCurrencyRate.toFixed(3);
}

// =========================================================================================
// All Event Listeners
// =========================================================================================
// 1 - Event Listener - to change source currency
sourceCurrency.addEventListener('change', e => {
    currentSourceCurrency = e.target.value;
    console.log(e.target.getAttribute('data-iso-code'));
    // sourceFlag.src = `https://countryflagsapi.com/svg/${currentSourceCurrency}`
    updateAllData(currenctSourceCurrencyAmount, currentSourceCurrency, currentTargetCurrency);
});
// 2 - Event Listener - to change target currency
targetCurrency.addEventListener('change', e => {
    currentTargetCurrency = e.target.value;
    updateAllData(currenctSourceCurrencyAmount, currentSourceCurrency, currentTargetCurrency);
});
// 3 - Event Listener - to get source currency input amount
sourceCurrencyAmount.addEventListener('input', e => {
    currenctSourceCurrencyAmount = parseFloat(e.target.value) || 1;
    updateTargetCurrencyAmount(currenctSourceCurrencyAmount)
});
// 4 - Event Listener - to swap currencies
swapButton.addEventListener('click', e => {
    let temp = currentSourceCurrency;
    currentSourceCurrency = currentTargetCurrency;
    currentTargetCurrency = temp;
    sourceCurrency.value = currentSourceCurrency;
    targetCurrency.value = currentTargetCurrency;
    updateAllData(currenctSourceCurrencyAmount, currentSourceCurrency, currentTargetCurrency);
});

// Init
updateAllData(1, currentSourceCurrency, currentTargetCurrency);