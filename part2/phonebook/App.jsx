import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response));
  }, []);

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

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .addPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        setNewName('');
        setNewNumber('');
      });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterName} />
    </div>
  )
}

export default App