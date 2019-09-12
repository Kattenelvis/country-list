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
  const wikiLink = `https://en.wikipedia.org/wiki/${name}`;
  return (
    <div className="showCountry">
      <div className="imgContainer">
        <img src={flag} alt="" width="250" />
      </div>
      <ul className="showCountryList">
        <li>
          <h1>{name}</h1>
        </li>
        <li>Population: {Math.round(population / 1000) * 1000}</li>
        <li>Capital: {capital}</li>
        <li>Area: {area}km²</li>
        <li>Gini: {gini}</li>
        <li>Native name: {nativeName}</li>
        <li>
          <a href={wikiLink} target="_blank" rel="noopener noreferrer">
            Wikipedia Link
          </a>
        </li>
        <li>
          Languages:
          {UlLangElement(languages)}
        </li>
      </ul>
    </div>
  );
};

export default countryInterface;
