import { useEffect, useState } from "react";
import getDataCity from "../services/api";

interface CityData {
  feels_like: Number;
  humidity: Number;
  pressure: Number;
  temp: Number;
  temp_max: Number;
  temp_min: Number;
}

function App() {
  const [cityData, setCityData] = useState<CityData>();
  const [city, setCity] = useState<String>("");

  function getWeather() {
    getDataCity(city)
      .then(({ data }) => setCityData(data.list[0].main))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="City name.."
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <button onClick={() => getWeather()}>Click me!</button>
      <ul className="city-data-container">
        <li>{cityData?.temp}</li>
        <li>{cityData?.feels_like}</li>
        <li>{cityData?.humidity}</li>
        <li>{cityData?.pressure}</li>
        <li>{cityData?.temp_max}</li>
        <li>{cityData?.temp_min}</li>
      </ul>
    </div>
  );
}

export default App;
