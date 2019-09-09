import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/style.css";
import ReactDOM from "react-dom";

const countryList = [249];
let currentSearchTerm = "";

const App = () => {
  const showCountries = countryArray =>
    countryArray.map(country => (
      <li key={country.numericCode} className="countryLi">
        <img src={country.flag} alt="" width="30" />
        <p className="countrName">{country.name}</p>
        <button
          className="btn"
          value={country.name}
          onClick={onSearchValueChanged}
        >
          Show
        </button>
      </li>
    ));

  const [visibleCountries, setVisibleCountries] = useState([]);

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      countryList.fill(response.data);
      setVisibleCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  const onSearchValueChanged = event => {
    currentSearchTerm = event.target.value;
    filterCountries();
  };

  const UlLangElement = ({ languages }) => {
    return (
      <ul>
        {languages.map((lang, index) => {
          return <li key={index}>{lang.name}</li>;
        })}
      </ul>
    );
  };

  const showCountryData = () => {
    if (visibleCountries.length === 1) {
      let selectedCountry = visibleCountries[0];
      if (selectedCountry.gini === null) selectedCountry.gini = "No info";
      return (
        <div className="showCountry">
          <h1>{selectedCountry.name}</h1>
          <ul className="showCountryList">
            <li>
              Population: {Math.round(selectedCountry.population / 1000) * 1000}
            </li>
            <li>Capital: {selectedCountry.capital}</li>
            <li>Area: {selectedCountry.area}km²</li>
            <li>Gini: {selectedCountry.gini}</li>
            <li>Native name: {selectedCountry.nativeName}</li>
            <li>
              Languages:
              {UlLangElement(selectedCountry)}
            </li>
          </ul>
          <img src={selectedCountry.flag} alt="" width="250" />
        </div>
      );
    }
  };

  const filterCountries = () => {
    setVisibleCountries(
      countryList[0].filter(
        country =>
          country.name
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase()) ||
          country.region
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase()) ||
          country.subregion
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase()) ||
          country.alpha2Code
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase()) ||
          country.alpha3Code
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase())
      )
    );
  };

  return (
    <main>
      <div className="header">
        <h1>Country Search</h1>
        <div className="search">
          <input onChange={onSearchValueChanged} className="searchBar" />
        </div>
      </div>
      <div>
        <ul className="coutryList">{showCountries(visibleCountries)}</ul>
        <div>{showCountryData()}</div>
      </div>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
