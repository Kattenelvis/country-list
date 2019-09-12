import React from "react";
import UlLangElement from "./domManipulation";

const countryInterface = ({
  gini,
  name,
  flag,
  population,
  capital,
  area,
  nativeName,
  languages
}) => {
  if (gini === null) gini = "No info";
  return (
    <div className="showCountry">
      <img src={flag} alt="" width="250" />
      <h1>{name}</h1>
      <ul className="showCountryList">
        <li>Population: {Math.round(population / 1000) * 1000}</li>
        <li>Capital: {capital}</li>
        <li>Area: {area}km²</li>
        <li>Gini: {gini}</li>
        <li>Native name: {nativeName}</li>
        <li>
          Languages:
          {UlLangElement(languages)}
        </li>
      </ul>
    </div>
  );
};

export default countryInterface;
