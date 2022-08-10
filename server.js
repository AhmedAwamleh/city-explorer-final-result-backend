const express = require(`express`);
require(`dotenv`).config();
const cors = require(`cors`);
const axios = require(`axios`)
const app = express();
app.use(cors());
const port = process.env.PORT;
const weatherData = require(`./data/weather.json`);

app.get("/weather", async (req, res) => {
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







})

app.get("/movies", async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=866151be502f307ffa13d482e87b239a&query=${searchQuery}`)

    try {
        const movieData = movieArr.data.results.map(item => new movie(item));
        res.status(200).send(movieData)

    } catch (error) {
        errorMes(error, res)
    }
})


class movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.avearge_votes = movie.vote_avearge;
        this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.released_date;
        this.total_votes = movie.vote_count;
    }
}

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description;
    }
}
app.listen(3001, () => {
    console.log(`Server is Working `)
}
)

function errorMes(error, res) {
    res.status(500).send({ error: `wrong Input` })
}




app.get(`*`, (req, res) => { res.status(404).send(`not found`) })