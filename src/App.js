import { useEffect, useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';
import { debounce } from './debounce';

function App() {
  const [city1, setCity1] = useState(null);
  const [city2, setCity2] = useState(null);

  const fetchPopulation = async (city, setter) => {
    if (!city) {
      return;
    }
    const res = await fetch(city._links["city:item"].href);

    if (res.status === 200) {
      const body = await res.json();
      setter({ ...city, population: body.population });
    }
  }

  useEffect(debounce(async () => fetchPopulation(city1, setCity1), 250), [city1]);
  useEffect(debounce(async () => fetchPopulation(city2, setCity2), 250), [city2]);

  return (
    <div className="App">
      <h2>City 1</h2>
      <div className="info-display">
        {city1 ?
          <>
            <span>Name: {city1?.matching_full_name}</span>
            <span>Population: {city1?.population}</span>
          </>
          :
          <span>-</span>
        }
      </div>
      <h2>City 2</h2>
      <div className="info-display">
        {city2 ?
          <>
            <span>Name: {city2?.matching_full_name}</span>
            <span>Population: {city2?.population}</span>
          </>
          :
          <span>-</span>
        }
      </div>
      {city1?.population && city2?.population &&
        <span>Population difference: {Math.abs(city1?.population - city2?.population)}</span>
      }
      <div className="autocomplete-wrapper">
        <span>Choose city 1:&nbsp;&nbsp;</span>
        <Autocomplete onCityClick={city => setCity1(city)} />
      </div>
      <div className="autocomplete-wrapper">
        <span>Choose city 2:&nbsp;&nbsp;</span>
        <Autocomplete onCityClick={city => setCity2(city)} />
      </div>
    </div>
  );
}

export default App;
