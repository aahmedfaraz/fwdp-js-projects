// All DOM Elements
const sourceLanguage = document.getElementById('source-language');
const targetLanguage = document.getElementById('target-language');
const sourceLanguageText = document.getElementById('source-language-text');
const targetLanguageText = document.getElementById('target-language-text');
const swapButton = document.getElementById('swap');
const copyToClipboardButton = document.getElementById('copy-to-clipboard');

// All Required Variables
let apiDelayTime = 3000; // milliseconds
let timer;

// All Functions
// 1 - Function to translate source language into target languagae after 3 seconds
const translateAfter3seconds = async () => {
    clearTimeout(timer);
    timer = await setTimeout(async () => {
        await translate();
    }, apiDelayTime);
}

// 2 - Function to translate without any delay
const translate = async () => {
    // verify if source language text is provided or not
    const sourceText = sourceLanguageText.value.trim();
    if(sourceText === '') {
        targetLanguageText.value = '';
        return;
    };

    // Get Data
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;

    // API Params
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", sourceText);
    encodedParams.append("target", targetLang);
    encodedParams.append("source", sourceLang);
    const options = {
    	method: 'POST',
    	headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '32c46c27f2mshbeb5e974f89bfddp1c56d6jsn6a1a54633de7',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    	},
    	body: encodedParams
    };

    try {
        // Get Translation
        const res = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options);
        const data = await res.json();
        if(!data.message) {
            targetLanguageText.value = data.data.translations[0].translatedText;
        } else {
            alert(data.message);
        }
    } catch (err) {
        // Error
        alert('Sorry, Something went wrong.');
        console.log("ERROR >> ", err);
    }
}

// 3 - Function to swap languages
const swapLanguages = () => {
    // swap languages
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    sourceLanguage.value = targetLang;
    targetLanguage.value = sourceLang;

    // swap texts
    const sourceText = sourceLanguageText.value.trim();
    const targetText = targetLanguageText.value.trim();
    sourceLanguageText.value = targetText;
    targetLanguageText.value = sourceText;
}

// All Event Listeners
// 1 - Event listener to track source langugae
sourceLanguage.addEventListener('change', () => {
    sourceLanguageText.value = '';
    targetLanguageText.value = '';
});

// 2 - Event listener to translate source language into target language
targetLanguage.addEventListener('change', translate);

// 3 - Event listener to translate source language into target language after 3 seconds
// when user will stop typing
sourceLanguageText.addEventListener('input', translateAfter3seconds);

// 4 - Event listener to swap between source and target languages
swapButton.addEventListener('click', swapLanguages);

// 5 - Event listener to copy target language text to clipboard
copyToClipboardButton.addEventListener('click', () => {
    const targetText = targetLanguageText.value.trim();
    try {
        navigator.clipboard.writeText(targetText);
        alert('Your text has been copied to clipboard.');
    } catch (err) {
        alert('Sorry, copy to clipboard is not supported here.')
    }
});