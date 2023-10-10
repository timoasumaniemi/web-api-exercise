import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import WeatherApi from './WeatherApi/WeatherApi';

function App() {
  return (
    <>
      <Header header="Weather forecast - Oulu, Toppilansalmi" />
      <Content />
      <Footer author="Timo Asumaniemi" />
    </>
  )
}

function Header(props) {
  return (
    <header>
      <div className="container-fluid">
        <h1>{props.header}</h1>
      </div>
    </header>
  )
}

function Content() {
  const [temperature, setTemperature] = useState("0")
  const [snowfall, setSnowfall] = useState("0")
  const [rainfall, setRainfall] = useState("0")
  const [windspeed, setWindspeed] = useState("0")

  const [temperatureChecked, setTemperatureChecked] = useState(true)
  const [snowfallChecked, setSnowfallChecked] = useState(false)
  const [rainfallChecked, setRainfallChecked] = useState(false)
  const [windspeedChecked, setWindspeedChecked] = useState(false)

  const OnSubmit = (event) => {
    event.preventDefault()

    let queryString = GetQueryString()

    if (queryString.length == 0) {
      alert("No parameters Checked! Please check at least 1 parameter")
      return
    }

    UpdateForecastData(queryString)
  }

  // Construct query string for open-meteo api
  function GetQueryString() {
    let tempQueryString = ""
    
    if (temperatureChecked) {
      tempQueryString += "temperature_2m,"
    }
    if (snowfallChecked) {
      tempQueryString += "snowfall,"
    }
    if (rainfallChecked) {
      tempQueryString += "rain,"
    }
    if (windspeedChecked) {
      tempQueryString += "windspeed_10m,"
    }
    
    // Remove last ',' character from the querystring
    tempQueryString = tempQueryString.slice(0, -1)
    
    return tempQueryString
  }
  
  async function UpdateForecastData(queryData) {
    
    try {
      let data = await WeatherApi(queryData)
      
      if (temperatureChecked) {
        setTemperature(data.current.temperature_2m + " " + data.current_units.temperature_2m)
      }
      if (snowfallChecked) {
        setSnowfall(data.current.snowfall + " " + data.current_units.snowfall)
      }
      if (rainfallChecked) {
        setRainfall(data.current.rain + " " + data.current_units.rain)
      }
      if (windspeedChecked) {
        setWindspeed(data.current.windspeed_10m + " " + data.current_units.windspeed_10m)
      }
      
      RenderResults()
    }
    catch (error) {
      console.error(error)
    }
  }

  function RenderResults() {
    document.getElementById("temperature-field").hidden = !temperatureChecked
    document.getElementById("snowfall-field").hidden = !snowfallChecked
    document.getElementById("rainfall-field").hidden = !rainfallChecked
    document.getElementById("windspeed-field").hidden = !windspeedChecked
  }
  
  return (
    <div className="container-fluid">
      <form onSubmit={OnSubmit}>
        <div id="forecast-box">
          <div className="forecast-result-element">
            <p>Current Weather:</p>
          </div>
          <div className="forecast-result-element">
            <p hidden={true} id="temperature-field">Temperature: {temperature}</p>
          </div>

          <div className="forecast-result-element">
            <p hidden={true} id="snowfall-field">Snowfall: {snowfall}</p>
          </div>

          <div className="forecast-result-element">
            <p hidden={true} id="rainfall-field">Rain: {rainfall}</p>
          </div>

          <div className="forecast-result-element">
            <p hidden={true} id="windspeed-field">Wind Speed: {windspeed}</p>
          </div>

        </div>

        <div id="weather-parameters-box">

          <div className="parameter-element">
            <p>Forecast parameters:</p>
          </div>

          <div className="parameter-element">
            <label htmlFor="current-temperature">Current Temperature</label>
            <input defaultChecked={true} id="current-temperature"
              type="checkbox"
              onChange={(e) => setTemperatureChecked(e.target.checked)}></input>
          </div>

          <div className="parameter-element">
            <label htmlFor="snowfall">Snowfall:</label>
            <input id="snowfall"
              type="checkbox"
              onChange={(e) => setSnowfallChecked(e.target.checked)}></input>
          </div>

          <div className="parameter-element">
            <label htmlFor="rain">Rain:</label>
            <input id="rain"
              type="checkbox"
              onChange={(e) => setRainfallChecked(e.target.checked)}></input>
          </div>

          <div className="parameter-element">
            <label htmlFor="wind-speed">Wind Speed:</label>
            <input id="wind-speed"
              type="checkbox"
              onChange={(e) => setWindspeedChecked(e.target.checked)}></input>
          </div>

          <div className="parameter-element">
            <input id="submit-button" type="submit" value="Get Forecast"></input>
          </div>

        </div>
      </form>
    </div>
  )
}


function Footer(props) {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <span className="muted">copyright: {props.author}</span>
      </div>
    </footer>
  )
}

export default App;
