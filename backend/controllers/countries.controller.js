async function getCountries(req, res){
    try {
        let response = await fetch(process.env.NAGER_BASE_URL + "AvailableCountries")
        let countriesList = await response.json();
        res.send(countriesList)
    } catch (error) {
        console.log("ERROR", error)
    }
}

module.exports = {
    getCountries
}