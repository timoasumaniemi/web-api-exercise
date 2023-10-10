import './App.css';
import { useState } from 'react';
import WeatherApi from './WeatherApi/WeatherApi';

function App() {
  return (
    <>
      <Header header="WEB API EXERSICE" />
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
  const [temperature, setTemperature] = useState(0)
  const [snowfall, setSnowfall] = useState(0)
  const [windspeed, setWindspeed] = useState(0)
  const [rainfall, setRainfall] = useState(0)

  const OnSubmit = (event) =>{
    event.preventDefault()
    UpdateForeacst()
  }

  async function UpdateForeacst() {
    let data = await WeatherApi("temperature_2m,snowfall")
    setTemperature(data.temperature_2m)
  }

  return (
    <div className="container-fluid">
      <form onSubmit={OnSubmit}>
        <p>Temperature: {temperature} C</p>
        <div id="weather-parameters-box">

          <div className="parameter-element">
            <label htmlFor="current-temperature">Current Temperature</label>
            <input defaultChecked id="current-temperature" type="checkbox"></input>
          </div>

          <div className="parameter-element">
            <label htmlFor="snowfall">Snowfall:</label>
            <input id="snowfall" type="checkbox"></input>
          </div>

          <div className="parameter-element">
            <label htmlFor="rain">Rain:</label>
            <input id="rain" type="checkbox"></input>
          </div>

          <div className="parameter-element">
            <label htmlFor="wind-speed">Wind Speed:</label>
            <input id="wind-speed" type="checkbox"></input>
          </div>

        </div>
        <label htmlFor="submit-button">Get Forecast</label>
        <input id="submit-button" type="submit"></input>
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
