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

const Country = (props) => {
  console.log(props.filteredCountries[0]);
  let idx = 0;
  if (props.selectedCountry === "") {
    idx = 0;
  } else {
    // find the selected country's index
    idx = props.filteredCountries.findIndex( (element) => element.name.common == props.selectedCountry )
  }
  return (
    <div>
      <h3>{props.filteredCountries[idx].name.common}</h3>
      <p>Capital: {props.filteredCountries[idx].capital[idx]}</p>
      <p>Area: {props.filteredCountries[idx].area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(props.filteredCountries[idx].languages).map((language) => (
          <li key={language}>
            {language}
          </li>
        ))}
      </ul>
      <img src={props.filteredCountries[idx].flags.png}></img>
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
  } else if (props.filteredCountries.length == 1 || props.selectedCountry !== "") {
    return (
      <Country selectedCountry={props.selectedCountry} filteredCountries={props.filteredCountries} />
    )
  } else {
    return (
      <ul>
        {props.filteredCountries.map((country) => (
          <div key={country.name.common}>
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={props.handler} country={country.name.common}>Show</button>
            </li>
          </div>
        ))}
      </ul>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [selState, setSelState] = useState("");

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
    setSelState('');
    console.log("new filter", event.target.value);
  };

  const buttonClick =  (event) => {
    console.log("button: ", event.target.getAttribute('country'));
    setSelState(event.target.getAttribute('country'));
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={newFilter} handler={handleChangeFilter} />
      <Countries filteredCountries={filteredCountries} selectedCountry={selState} handler={buttonClick} />
    </div>
  );
};

export default App;
