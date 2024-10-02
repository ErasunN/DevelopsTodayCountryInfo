async function getCountry(req, res){
    try {
        let requestedCountryCode = req.params.ID

        let infoResponse = await fetch(process.env.NAGER_BASE_URL + "CountryInfo/" + requestedCountryCode)
        let countryInfo = await infoResponse.json();

        let populationResponse;
        let countryPopulation;

        let flagResponse;
        let countryFlag;

        if(countryInfo){
            let countryName = countryInfo.commonName.toLowerCase();

            populationResponse = await fetch(process.env.COUNTRIESNOW_BASE_URL + "countries/population", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: countryName
                }),
            })
            let parsedPopulation = await populationResponse.json();
            countryPopulation = await parsedPopulation.data;

            flagResponse = await fetch(process.env.COUNTRIESNOW_BASE_URL + "countries/flag/images", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: countryName
                }),
            })
            let parsedFlag = await flagResponse.json();
            countryFlag = await parsedFlag.data;
        }

        res.send({
            info: countryInfo,
            population: countryPopulation,
            flag: countryFlag
        })
    } catch (error) {
        console.log("ERROR", error)
    }
}

module.exports = {
    getCountry
}