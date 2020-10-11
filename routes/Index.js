// Include Router to make restful apis
const express = require('express');
const router = express.Router();

// node-fetch package to make requests to endpoints
const fetch = require("node-fetch");

// Include Variables
const params = "waterTemperature";
const dateNow = "2020-09-19";
const Weather_Key =
    "40394772-f9eb-11ea-a78a-0242ac130002-40394830-f9eb-11ea-a78a-0242ac130002";

// Include Utils 
const sendResponse = require("../Utils/sendResponse");

// Get Request to (/) to render Index.ejs
router.get('/', (req, res, next) => {
    res.render('Index');
});

// Post Request to (/getWeather) in order to response the weather details of location
router.post('/getWeather', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const response = await fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateNow}&end=${dateNow}`,
        {
            method: "GET",
            headers: { Authorization: Weather_Key, Accept: "application/json" },
        }
    );
    const weatherData = await response.json();
    if (weatherData.errors) {
        const error = weatherData.errors.key || "Something went wrong";
        return sendResponse(res, 402, error, 'Something went wrong')
    }
    sendResponse(res, 200, 'Success', 'Weather Data is comming successfully', weatherData)
  } catch(err) {
      sendResponse(res, 500, err.message, 'Something went wrong')
  }
})
module.exports = router;
