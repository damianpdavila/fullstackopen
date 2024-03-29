import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    console.log("effect ", name);
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
          console.log("promise fulfilled ", response.data);
          setCountry(response.data[0]);
        })
        .catch(function (error) {
          console.log(error.toJSON());
          setCountry("");
        });
    }
  }, [name]);

  console.log("returning ", country);
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return <div> not found... </div>;
  }
  console.log("in Country:", country);
  return (
    <div>
      <h3> {country.name.common} </h3>
      <div> population {country.population} </div>
      <div> capital {country.capital} </div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("Cuba");
  const country = useCountry(name);

  console.log('App, country=', country)

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button> find </button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
