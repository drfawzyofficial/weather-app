// Import Packages here
const fetch = require("node-fetch");
const fileSystem = require("fs");
const chalk = require("chalk");

// Constant Variables
const params = "waterTemperature";
const dateNow = "2020-09-19";
const Weather_Key =
    "40394772-f9eb-11ea-a78a-0242ac130002-40394830-f9eb-11ea-a78a-0242ac130002";

// getWeather function to retrieve the weather details about the location(sending lat & lng of the location)
const getWeather = async (lat, lng) => {
    try {
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
            return console.error(chalk.red.bold(error));
        }

        const newWeatherData = await oldWeatherData();

        newWeatherData.push(weatherData);

        fileSystem.writeFileSync("weather.json",  JSON.stringify(newWeatherData));
      
    } catch (err) {
        console.error(chalk.red.bold(err.message));
    }
};

const oldWeatherData = async () => {
    try {
        const dataBuffer = fileSystem.readFileSync("weather.json")
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (err) {
        return []
    }
}

// Export the getWeather function
module.exports = getWeather;
