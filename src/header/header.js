import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="topHeader">
        <div className="blueRect"></div>
        <h1>Country Search</h1>
      </div>
      <div className="mainHeader">
        <div className="search">
          <input
            type="search"
            className="searchBar"
            maxLength="100"
            placeholder="Search among 249 countries and territories"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
