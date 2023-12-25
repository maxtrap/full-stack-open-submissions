const App = () => {
  const fighters = [
    {name: 'Pat', age: '30'},
    {name: 'Lizzo', age: '35'},
  ]

  return (
    <>
      <p>{fighters[0].name} {fighters[0].age}</p>
      <p>{fighters[1].name} {fighters[1].age}</p>
    </>
  )
}

export default App