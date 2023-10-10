import axios from 'axios';

async function WeatherApi(params) {

    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: 65.0124,
            longitude: 25.4682,
            current: params
        }
    })

    console.log(response.data)

    return response.data.current
}

export default WeatherApi;