import { useState, useEffect } from "react";
import axios from 'axios';
import personService from './services/persons';

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
      {props.filteredContacts.map((person) => {
        return (
            <p key={person.name}>
              {person.name} {person.phone} &nbsp;
              <button key={person.name} onClick={() => props.handleDelete(person.id)}>
                delete
              </button>
            </p>
        )
      })}
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
    personService.getAll()
      .then(allPersons => setPersons(allPersons));
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
  
  const handleDelete = (id) => {
    console.log("delete button clicked", id); 
    
    const target = persons.find(person => person.id === id);
    if (! window.confirm(`Delete ${target.name}?`)) {
      return;
    }
    personService.deletePerson(id)
      .then((deleted) => {
        const newList = persons.filter(contact => contact.id !== id);
        setPersons(newList);
      })
  };

  const nameExists = (name) => {
    const idx = persons.findIndex(
      (existing) => existing.name.toLowerCase() === name.toLowerCase()
    );
    return idx > -1;
  };

  const addPerson = () => {
    const newPerson = {
      name: newName.trim(),
      phone: newPhone.trim()
    }
    personService.create(newPerson)
      .then((added) => {
        setPersons(persons.concat(added));
      })
  };

  const updatePhone = (name) => {
    // find record
    const updateId = persons.find(person => person.name.toLowerCase() === name.toLowerCase()).id;
    // update it
    personService.updatePhone(updateId, newPhone)
      .then((response) => {
        const updatedList = persons.map((person) => {
          if (person.id === updateId) {
            person.phone = newPhone;
          }
          return person;
        })
        setPersons(updatedList);
      })

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    if (nameExists(newName.trim())) {
      if ( window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePhone(newName.trim());
        setNewName("");
        setNewPhone("");
      }
    } else {
      addPerson();
      setNewName("");
      setNewPhone("");

    }
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
      <Contacts filteredContacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
