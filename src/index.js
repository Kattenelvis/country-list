import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'
import ReactDOM from 'react-dom'

const countryList = [249]
let currentSearchTerm = ''



const App = () =>{

    const showCountries = (countryArray) => countryArray.map(country => 
        <li key={country.numericCode} className="countryLi">
            <button className="btn" value={country.name}
            onClick={onSearchValueChanged}>Show</button> {country.name} 
        </li>)
        
    const [visibleCountries, setVisibleCountries] = useState([])

    const fetchCountries = () => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            countryList.fill(response.data)
            setVisibleCountries(response.data)
        })
    }

    useEffect(fetchCountries, [])

    const onSearchValueChanged = (event) =>{
        currentSearchTerm = event.target.value
        filterCountries()
    }

    const showCountryData = () => {
        if (visibleCountries.length === 1){
            return( 
                <div>
                    <h1>{visibleCountries[0].name}</h1>
                    <h4>Population: {Math.round(visibleCountries[0].population/1000)*1000}</h4>
                    <h4>Capital: {visibleCountries[0].capital}</h4>
                    <img  src={visibleCountries[0].flag} alt="" width="250"/>
                
                </div>
            )
        }         
    }

    const filterCountries = () =>{
        setVisibleCountries(countryList[0].filter(country =>
            country.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            country.region.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            country.subregion.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            country.alpha2Code.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            country.alpha3Code.toLowerCase().includes(currentSearchTerm.toLowerCase())
            ))
        }

    return(
    
        <main>            
            <div>
                <h1>Country Search</h1>
                <h4>Search:  <input onChange={onSearchValueChanged}/></h4> 
            </div>
            <div>
                <ul className="coutryList">
                    {showCountries(visibleCountries)}
                </ul>

                <div>{showCountryData()}</div>

            </div>
        </main>

    )}

ReactDOM.render(
    <App />, document.getElementById('root'))