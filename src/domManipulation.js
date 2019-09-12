import React from "react";

const UlLangElement = languages => {
  return (
    <ul>
      {languages.map((lang, index) => {
        return <li key={index}>{lang.name}</li>;
      })}
    </ul>
  );
};

export default UlLangElement;
