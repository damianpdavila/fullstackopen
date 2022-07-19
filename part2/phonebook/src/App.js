import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChangeInput = (event) => {
    setNewName(event.target.value);
    console.log('new name', event.target.value);
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
    setPersons(persons.concat({name: newName.trim()}));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeInput} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map( (person) => <p key={person.name}>{person.name}</p>) }
    </div>
  )
}

export default App