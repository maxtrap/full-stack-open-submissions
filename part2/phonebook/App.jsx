import { useState } from 'react'


const Numbers = ({ persons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(person =>
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>)}
      </tbody>
    </table>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const addName = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    setPersons(persons.concat(
      {
        name: newName,
        number: newNumber,
      }
    ));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App