const express = require(`express`);
require(`dotenv`).config();
const cors = require(`cors`);
const axios = require(`axios`)
const { handleWeather } = require('./module/weather')
const { handleMovie } = require('./module/movies');
const app = express();
app.use(cors());
const port = process.env.PORT;
const weatherData = require(`./data/weather.json`);


app.get('/weather', handleWeather)
app.get('/movies', handleMovie)




app.listen(3001, () => {
    console.log(`Server is Working `)
}
)

function errorMes(error, res) {
    res.status(500).send({ error: `wrong Input` })
}




app.get(`*`, (req, res) => { res.status(404).send(`not found`) })