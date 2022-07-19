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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    setPersons(persons.concat({name: newName}));
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