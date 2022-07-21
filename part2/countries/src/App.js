import { useState, useEffect } from "react";
import axios from 'axios';

const Filter = (props) => {
  return (
    <div>
      Filter countries by name:{" "}
      <input value={props.filter} onChange={props.handler} />
    </div>
  );
};

const Countries = (props) => {
  if (props.filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (props.filteredCountries.length == 1 ) {
    console.log(props.filteredCountries[0].languages);
    return (
      <div>
        <h3>{props.filteredCountries[0].name.common}</h3>
        <p>Capital: {props.filteredCountries[0].capital[0]}</p>
        <p>Area: {props.filteredCountries[0].area}</p>
        <h4>Languages:</h4>
        <ul>
          {Object.values(props.filteredCountries[0].languages).map((language) => (
            <li key={language}>
              {language}
            </li>
          ))}
        </ul>
        <img src={props.filteredCountries[0].flags.png}></img>
      </div>
    );
  } else {
    return (
      <div>
        {props.filteredCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
          </p>
        ))}
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  );

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
    console.log("new filter", event.target.value);
  };

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={newFilter} handler={handleChangeFilter} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
