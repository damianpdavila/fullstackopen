import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '123-123-1234' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const filteredContacts = persons.filter((contact) => contact.name.toLowerCase().startsWith(newFilter.toLowerCase()) )

  const handleChangeName = (event) => {
    setNewName(event.target.value);
    console.log('new name', event.target.value);
  }

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
    console.log('new phone', event.target.value);
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
    console.log('new filter', event.target.value);
  }

  const nameExists = (name) => {
    const idx = persons.findIndex((existing) => existing.name.toLowerCase() === name.toLowerCase());
    return (idx > -1);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    if (nameExists(newName.trim())) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat({name: newName.trim(), phone: newPhone.trim()}));
    setNewName('');
    setNewPhone('');

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter list by name: <input value={newFilter} onChange={handleChangeFilter} />
      </div>
      <form>
        <h3>Add a New Contact</h3>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h3>Contacts</h3>
      { filteredContacts.map( (person) => <p key={person.name}>{person.name} {person.phone}</p>) }
    </div>
  )
}

export default App