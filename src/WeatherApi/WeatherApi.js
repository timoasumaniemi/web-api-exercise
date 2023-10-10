import axios from 'axios';

async function WeatherApi(queryString) {

    if (queryString.length == 0) {
        throw new Error('Querydata is empty')
    }

    // Weather Forecast API: https://open-meteo.com/en/docs
    // Coordinates set for Oulu, toppilansalmi
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: 65.0351,
            longitude: 25.4465,
            current: queryString
        }
    })

    return response.data
}

export default WeatherApi;