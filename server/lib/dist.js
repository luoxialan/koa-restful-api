const axios = require('axios');
const config = require('./../config');

const gcpApiKey = config.GCP_API_KEY;
const gcpDistUrl = config.GCP_URL;

const getDistanceMatrix = async (origins, destinations, mode = 'driving', unitType = 'metric') => {
    const reducer = (accumulator, currentValue) => `${accumulator},${currentValue}`;
    const tripOrigins = origins.reduce(reducer);
    const tripDestinations = destinations.reduce(reducer);

    const distanceUrl = `${gcpDistUrl}?units=${unitType}&origins=${tripOrigins}&destinations=${tripDestinations}&mode=${mode}&key=${gcpApiKey}`;

    return await axios.get(distanceUrl)
    .then(response => {
        let dist = response.data.rows[0]["elements"][0]["distance"]["text"];
        const result = dist.split(" ");
        const unit = result[1];
        dist = isNaN(parseFloat(result[0])) ? 0 : parseFloat(result[0]);
        if(unit == config.DIST_UNIT.kilometer){
            dist = dist * 1000;
        }
        return dist;
    })
    .catch(err => {
        return { error: err.message};
    });
}

module.exports = {
  getDistanceMatrix
};