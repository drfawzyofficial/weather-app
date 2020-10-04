// Import Packages here
const fetch = require("node-fetch");
const chalk = require('chalk');

// Constant Variables
const geoCode_Key = "pk.234704d88f20576233860b33f0d7dc85";

// GeoCode function to retrieve the lat & long of the sent address(location)
const GeoCode = async (address) => {
   try {
    const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${geoCode_Key}&q=${address}&format=json`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    const geocodeData = await response.json();

    return geocodeData;
    
   } catch(err) {
    console.error(chalk.red.bold(err.message));
   }
    
}

// Export the GeoCode function
module.exports = GeoCode;