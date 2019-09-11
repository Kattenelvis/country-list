import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/style.css";
import ReactDOM from "react-dom";

const countryList = [249];
let currentSearchTerm = "";

const App = () => {
  const showCountries = countryArray =>
    countryArray.map(({ numericCode, flag, name }) => (
      <li key={numericCode} className="countryLi">
        <div className="countryLiTop">
          <img src={flag} alt="" width="30" />
          <p>{name}</p>
        </div>
        {/* <button className="btn" value={name} onClick={onSearchValueChanged}> */}
        {/* Show */}
        {/* </button> */}
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
        <div className="topHeader">
          <div className="blueRect"></div>
          <h1>Country Search</h1>
        </div>
        <div className="mainHeader">
          <div className="search">
            <input
              type="search"
              onChange={onSearchValueChanged}
              className="searchBar"
              maxLength="100"
              placeholder="Search among 249 countries and territories"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
      <div className="CountryDiv">
        <ul className="coutryList">{showCountries(visibleCountries)}</ul>
        <div>{showCountryData()}</div>
      </div>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
