import { useState, useEffect } from "react";
import axios from 'axios';

const Filter = (props) => {
  return (
    <div>
      Filter list by name:{" "}
      <input value={props.filter} onChange={props.handler} />
    </div>
  );
};

const ContactForm = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.newName} onChange={props.handleChangeName} />
      </div>
      <div>
        phone:{" "}
        <input value={props.newPhone} onChange={props.handleChangePhone} />
      </div>
      <div>
        <button type="submit" onClick={props.handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

const Contacts = (props) => {
  return (
    <div>
      {props.filteredContacts.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const handleChangeName = (event) => {
    setNewName(event.target.value);
    console.log("new name", event.target.value);
  };

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
    console.log("new phone", event.target.value);
  };

  const filteredContacts = persons.filter((contact) =>
    contact.name.toLowerCase().startsWith(newFilter.toLowerCase())
  );

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
    console.log("new filter", event.target.value);
  };

  const nameExists = (name) => {
    const idx = persons.findIndex(
      (existing) => existing.name.toLowerCase() === name.toLowerCase()
    );
    return idx > -1;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    if (nameExists(newName.trim())) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(
      persons.concat({ name: newName.trim(), phone: newPhone.trim() })
    );
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleChangeFilter} />
      <h3>Add a New Contact</h3>
      <ContactForm
        newName={newName}
        newPhone={newPhone}
        handleChangeName={handleChangeName}
        handleChangePhone={handleChangePhone}
        handleSubmit={handleSubmit}
      />
      <h3>Contacts</h3>
      <Contacts filteredContacts={filteredContacts} />
    </div>
  );
};

export default App;
