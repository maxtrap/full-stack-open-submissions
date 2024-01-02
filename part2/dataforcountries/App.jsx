import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDisplay = ({ countries, singleCountry, loadingCountry }) => {

  if (!countries) {
    return (
      <div>
        <p>Loading countries...</p>
      </div>
    );
  }

  if (loadingCountry) {
    return (
      <div>
        <p>Loading data for {loadingCountry}...</p>
      </div>
    );
  }

  if (singleCountry) {
    return (
      <div>
        <h2>{singleCountry.name.common}</h2>
        <p>Capital: {singleCountry.capital}</p>
        <p>Area: {singleCountry.area}</p>

        <h3>Languages</h3>
        <ul>
          {Object.values(singleCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={singleCountry.flags.png} alt={singleCountry.flags.alt} />
      </div>
    );
  }

  if (countries.length > 10) {
    return (<div>
      Too many matches, specify another filter.
    </div>);
  }

  if (countries.length === 0) {
    return (<div>No matches found. Specify another filter.</div>)
  }

  return (
    <div>
      {countries.map(c => <p key={c}>{c}</p>)}
    </div>
  )
};

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [countryList, setCountryList] = useState(null);
  const [singleCountry, setSingleCountry] = useState(null);


  const handleSearchChange = event => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);

  };

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countryData = response.data.map(countryData => countryData.name.common);
        setCountryList(countryData);
      });
  }, [])

  const countriesToDisplay =
    countryList ?
      countryList.filter(c => c.toLowerCase().includes(searchValue.toLowerCase())) :
      null;

  let loadingCountry;
  if (countriesToDisplay) {
    if (countriesToDisplay.length === 1 && !singleCountry) {
      loadingCountry = countriesToDisplay[0];
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countriesToDisplay[0]}`)
        .then(response => {
          setSingleCountry(response.data);
        });
    } else if (singleCountry && countriesToDisplay.length !== 1) {
      setSingleCountry(null);
    }
  }



  return (
    <div>
      <div>
        <label htmlFor='fcountries'>find countries </label>
        <input id='fcountries' value={searchValue} onChange={handleSearchChange} />
      </div>
      <CountryDisplay countries={countriesToDisplay} singleCountry={singleCountry} loadingCountry={loadingCountry} />
    </div>
  )
}

export default App