import { useState } from 'react'


const Numbers = ({ persons, filter }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
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
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilterName(event.target.value);
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
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={filterName} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
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
      <Numbers persons={persons} filter={filterName} />
    </div>
  )
}

export default App