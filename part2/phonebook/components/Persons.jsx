const Persons = ({ persons, filter }) => {
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

export default Persons;