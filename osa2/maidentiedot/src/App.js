import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({rows}) => {
  console.log(rows.length)
  if (rows.length === 0) return (<><p>No results</p></>)
  if (rows.length > 11) return (<><p>Too many matches, specify another filter</p></>)
  if (rows.length === 1) return (<OneCountry country = {rows[0].props.country} />)
  
  return (<>{rows}</>)
}
const Weather = ({city}) => {
  const [temperature, setTemperature] = useState('')
  const [iconsrc, setIcon] = useState('')
  const [wind, setWind] = useState('')
  const src = 'http://api.apixu.com/v1/current.json?key=177868c04587452b9ed185909191606&q=' + city
  console.log(src)

  const hook2 = () => {
    console.log('using hook2')
    axios
      .get(src)
      .then(response => {
        console.log('weather data')
        console.log(response.data)
        setTemperature(response.data.current.temp_c + ' Celsius')
        setWind(response.data.current.wind_kph + ' direction ' + response.data.current.wind_dir)
        setIcon(response.data.current.condition.icon)
      })
  }
  useEffect(hook2, [])
  return(
    <>
    <p><strong>temperature:</strong> {temperature}</p>
    <img width = "50" src = {iconsrc} alt = 'icon' />
    <p><strong>wind:</strong> {wind}</p>

    </>
  )

}

const OneCountry = ({country}) => {
  const list =() => 
    country.languages.map(language => <li key = {language.name}>{language.name}</li>
  )
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
          {list()}
      </ul>
      <img alt = "flag" width = "100" src = {country.flag} />
      <Weather city = {country.capital} />
    </>

  )
}
const Button = ({handler}) => (
  <button onClick = {handler}>
    show
    </button>
)

const Country = ({country, handler}) => (
  <li>{country.name} <Button handler = {handler}/>
  </li>
)

const Search = ({filter, handler}) => {
  return (
    <div>
      find countries: <input 
      value = {filter}
      onChange = {handler}
      />
    </div>
  )
}


const App =() =>{
  const [newFilter, setNewFilter] = useState('')
  const [countrys, setCoutrys] = useState([])
  const handleFilterChange = (event) => setNewFilter(event.target.value)


  const countrysToShow = !newFilter
    ? countrys
    : countrys.filter(country =>country.name.toLowerCase().includes(newFilter.toLowerCase()))


  const rows = () => countrysToShow.map(country =>
    <Country
      key = {country.name}
      country = {country}
      handler = {() => setNewFilter(country.name)}
    />

  )
  
  const hook = () => {
    console.log('using hook')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fullfilled')
        console.log(response)
        setCoutrys(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <Search filter = {newFilter} handler = {handleFilterChange}/>
      <Countries rows = {rows()}/>

    </div>
  )
}

export default App