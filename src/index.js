import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/style.css";
import ReactDOM from "react-dom";
import Footer from "./footer";
import Header from "./header/header.js";
import countryInterface from "./countryInterface";

const countryList = [249];
let currentSearchTerm = "";
const App = () => {
  const [visibleCountries, setVisibleCountries] = useState([]);
  const showCountries = countryArray =>
    countryArray.map(({ numericCode, flag, name }) => (
      <li
        key={numericCode}
        className="countryLi"
        value={name}
        onClick={onSearchValueChanged}
      >
        <div className="countryLiTop">
          <img src={flag} alt="" width="30" />
          <p>{name}</p>
        </div>
      </li>
    ));

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      countryList.fill(response.data);
      setVisibleCountries(response.data);

      //Fixing all the edge cases
      countryList[0][214].name = " Sudan ";
      countryList[0][161].name = " Niger ";
      countryList[0][64].name = " Dominica ";
      countryList[0][13].name = " Australia ";
    });
  };

  useEffect(fetchCountries, []);

  //The interface when you interact with a country
  const showCountryData = () => {
    if (visibleCountries.length === 1) {
      return countryInterface(visibleCountries[0]);
    }
  };

  document.addEventListener("DOMContentLoaded", e => {
    const search = document.getElementsByClassName("search")[0].children[0];
    search.addEventListener("input", e => {
      onSearchValueChanged(e);
    });
  });

  const onSearchValueChanged = event => {
    if (event.target.value === undefined)
      currentSearchTerm = event.currentTarget.textContent;
    else currentSearchTerm = event.target.value;
    filterCountries();
  };

  const filterCountries = () => {
    setVisibleCountries(
      countryList[0].filter(
        ({ name, region, subregion, alpha2Code, alpha3Code }) =>
          contains(name, currentSearchTerm) ||
          contains(region, currentSearchTerm) ||
          contains(subregion, currentSearchTerm) ||
          contains(alpha2Code, currentSearchTerm) ||
          contains(alpha3Code, currentSearchTerm)
      )
    );
  };

  const contains = (a, term) => {
    return a.toLowerCase().includes(term.toLowerCase());
  };

  return (
    <div className="contentWrap">
      <main>
        <Header />
        <div className="countryInterface"></div>
        <div className="CountryDiv">
          <ul className="coutryList">{showCountries(visibleCountries)}</ul>
          <div>{showCountryData()}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
