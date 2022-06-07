import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"

function App() {

  const [latLon, setLatLon] = useState({})
  const [weather, setWeather] = useState()
  

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setLatLon({lat, lon})
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {

    if(latLon.lat !== undefined) {

      const API_KEY = '2ee13e8beb4e6e2fbe165cbc44ef660f'

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
      
      axios.get(URL)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
    }
  }, [latLon])
  

  console.log(weather);
  const temCelcius = (weather?.main.temp - 273).toFixed(2)
  const celciusTem = `Current Temperature: ${temCelcius} °C`

  const temFahrenheit = ((weather?.main.temp -273)*9/5 + 32).toFixed(2)
  const fahrenheitTem = `Current Temperature: ${temFahrenheit} °F`

  const [change, setChange] = useState(false)

  const changeTemp = () => setChange(!change)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])
  

  return (
    <div className="main">
    {loading? <ClipLoader color={'#1B768A'} loading={loading} size={100} className="loader" />:
    <div className="App">
    <h1>Weather</h1>
    <h2>City: {weather?.name} - {weather?.sys.country}</h2>
    <section className="img_section">
      <div className="time">
      <div className={temCelcius > 21 ? "weather sunny": temCelcius < 21 && temCelcius > 15 ? " weather cloudy" : "weather snowy"}></div>
      </div>
      <div className="aditional_dates">
        <p><span>Current conditions</span></p>
        <div className="conditions">
        <i class="fa-solid fa-wind"></i>
        <p><b>Wind speed:</b> {weather?.wind.speed} m/s</p>
        </div>
        <div className="conditions">
        <i class="fa-solid fa-cloud"></i>
        <p><b>Clouds:</b> {weather?.clouds.all} %</p>
        </div>
        <div className="conditions">
        <i class="fa-solid fa-clock"></i>
        <p><b>Pressure:</b> {weather?.main.pressure} hPa</p>
        </div>
      </div>
    </section>
    <h3>{change ? celciusTem: fahrenheitTem}</h3>
    <button onClick={changeTemp}>{change ? 'Show in °F' : 'Show in °C'}</button>
  </div>
    }
    
    </div>
  )
}

export default App
