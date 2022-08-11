const axios = require(`axios`)
async function handleWeather(req, res) {
    const searchQuery = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;
    //WEATHER_API_KEY
    const cityArry = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)

    console.log(cityArry.data)
    const result = []

    try {
        cityArry.data.data.map(item => {
            result.push(new Forecast(item))
        })

        res.status(200).send(result);
    } catch (error) {
        errorMes(error, res)
    }
}

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description;
    }
};




module.exports = { handleWeather }


