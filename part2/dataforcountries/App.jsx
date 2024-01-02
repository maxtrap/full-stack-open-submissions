import { useState, useEffect } from 'react';
import axios from 'axios';

const getWeatherUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_KEY}`;

const WeatherDisplay = ({ country, weatherData }) => {
  if (!weatherData) {
    return (
      <div>
        <p>Loading weather data for {country.capital}...</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {Math.round((weatherData.main.temp - 273.15) * 100) / 100}°C</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather icon' />
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
}

const CountryDisplay = ({ countries, singleCountry, loadingCountry, showSingleCountry, weatherData }) => {

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

        <WeatherDisplay country={singleCountry} weatherData={weatherData} />
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
      {countries.map(c =>
        <div key={c}>
          {c}
          <button onClick={() => showSingleCountry(c)}>show</button>
        </div>)}
    </div>
  )
};

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [countryList, setCountryList] = useState(null);
  const [singleCountry, setSingleCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);


  const handleSearchChange = event => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  };

  const handleSingleCountryShow = country => {
    setSearchValue(country);
  }

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
        .then(response => setSingleCountry(response.data));
    } else if (singleCountry && countriesToDisplay.length !== 1) {
      setSingleCountry(null);
      setWeatherData(null);
    }
  }

  useEffect(() => {
    if (singleCountry) {
      const [lat, lon] = singleCountry.capitalInfo.latlng;
      axios
        .get(getWeatherUrl(lat, lon))
        .then(weatherInfo => {
          setWeatherData(weatherInfo.data);
        });
    }
  }, [singleCountry]);


  return (
    <div>
      <div>
        <label htmlFor='fcountries'>find countries </label>
        <input id='fcountries' value={searchValue} onChange={handleSearchChange} />
      </div>
      <CountryDisplay
        countries={countriesToDisplay}
        singleCountry={singleCountry}
        loadingCountry={loadingCountry}
        showSingleCountry={handleSingleCountryShow}
        weatherData={weatherData}
      />
    </div>
  )
}

export default App