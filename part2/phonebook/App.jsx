import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
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
  const [notifMessage, setNotifMessage] = useState(null);

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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already in the phonebook, replace old number with new one?`)) {
        const id = persons.find(p => p.name === newName).id;
        personService
          .updatePerson(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === id ? returnedPerson : p));
            notify(`Changed ${returnedPerson.name}'s phone number`);
            setNewName('');
            setNewNumber('');
          });
      }
      return;
    }

    personService
      .addPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        notify(`Added ${addedPerson.name}`);
        setNewName('');
        setNewNumber('');
      });
  }

  const handleDelete = person => {
    if (!confirm(`Delete ${person.name}?`)) {
      return;
    }
    personService
      .deletePerson(person.id)
      .then(deletedPerson => setPersons(persons.filter(p => p.id !== person.id)))
  };

  const notify = message => {
    setNotifMessage(message);
    setTimeout(() => setNotifMessage(null), 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifMessage} />
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
      <Persons persons={persons} filter={filterName} handleDelete={handleDelete} />
    </div>
  )
}

export default App