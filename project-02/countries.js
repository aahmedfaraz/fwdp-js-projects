const generateOptionTags = async () => {
    try {
        // =========================================================================
        // GET ALL SUPPORTED SYMBOLS
        // =========================================================================
        const response = await fetch('https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2ff5d441b3msh027a92a261ae509p1bac58jsn1206ca86cdeb',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        });
        const data = await response.json();
        const allSymbols = data.symbols;
        console.log("SYMBOLS >> ", allSymbols);

        // =========================================================================
        // GET ALL COUNTRIES ALL DATA
        // =========================================================================
        try {
            const response = await fetch('https://country-info1.p.rapidapi.com/', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '2ff5d441b3msh027a92a261ae509p1bac58jsn1206ca86cdeb',
                    'X-RapidAPI-Host': 'country-info1.p.rapidapi.com'
                }
            });
            const allCountriesData = await response.json();
            console.log("ALL COUNTRIES DATA >> ", allCountriesData);


            // =========================================================================
            // FILTER COUNTRIES THAT ARE SUPPORTED
            // =========================================================================
            const filteredCountries = [];

            Object.entries(allSymbols).sort().forEach(([symbol, val]) => {
                allCountriesData.forEach(country => {
                    if(symbol === country.CurrencyCode){
                        filteredCountries.push({
                            countryName: country.COUNTRY,
                            symbol: country.CurrencyCode,
                            currencyName: country.CurrencyName,
                            isoCode: country["ISO CODE 2|3"].split(" / ")[1],
                        })
                    }
                })
            });

            console.log("FILTERED COUNTRIES >> ", filteredCountries);

            
            // =========================================================================
            // GENERATE STRING DYNAMICALLY
            // =========================================================================
            let allHTMLOptions = ``;
            filteredCountries.forEach(country => {
                allHTMLOptions += `<option value="${country.symbol}" data-iso-code="${country.isoCode}">${country.symbol} - ${country.currencyName} - ${country.countryName}</option>\n`
            });

            console.log("OPTIONS >> ", allHTMLOptions);

        } catch (err) {
            console.log("ERROR >> ", err);
        }

    } catch (err) {
        console.log("ERROR >> ", err);
    }
}

generateOptionTags();