const Person = ({ person, handleDelete }) => {
    return (<tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={() => handleDelete(person)}>Delete</button></td>
    </tr>);
}

const Persons = ({ persons, filter, handleDelete }) => {
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
                    .map(person => <Person key={person.id} person={person} handleDelete={handleDelete} />)}
            </tbody>
        </table>
    );
}

export default Persons;