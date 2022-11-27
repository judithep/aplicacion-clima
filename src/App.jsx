import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
 
  const [coords, setcoords] = useState()
  const [weather, setWeather] = useState()
 const [temp, setTemp] = useState()

  const success = pos => {
    setcoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }
  useEffect(()  => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords){
      const apiKey = 'cd6573a6bddee24deb6b85d185385cfc'
      const URL =  `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(URL) 
        .then(res => {
          setWeather(res.data)
          
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit =(celsius * 9/5 + 32).toFixed(1)
          setTemp({celsius, fahrenheit})
        })
        .catch(err => console.log(err))

    }
    
  }, [coords])

  return (
    <div className="App">
      {
        weather?
      <WeatherCard 
      weather={weather}
      temp={temp} 
      />
      :
      <span className='loader'></span>
       }
    </div>
  )
}

export default App
