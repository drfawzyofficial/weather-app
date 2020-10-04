// Include Packages
const chalk = require("chalk");

// Include Utils 
const GeoCode = require('./Utils/GeoCode');
const getWeather = require("./Utils/getWeather");


// Main Function
(async () => {
	try {

		const location = process.argv[2];

		if(!location) return console.error(chalk.yellow.bold('The location is not provided'));

		const geocodeData = await GeoCode(location);

		if (geocodeData.error) return console.error(chalk.red.bold(geocodeData.error));

		const position = {
			lat: geocodeData[0].lat,
			lng: geocodeData[0].lon,
		};

		await getWeather(position.lat, position.lng)

		
	} catch (err) {
		console.error(chalk.red.bold(err.message));
	}
})();

// We will make an endpoint to receive the location with (lat & lng) to send request to the weather API for retrieving the weather details about this location
