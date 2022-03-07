import {useState } from "react";
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
  const [showDataCity, setShowDataCity] = useState<Boolean>(false);

  function getWeather() {
    getDataCity(city)
      .then(({ data }) => {
        setCityData(data.list[0].main);
        setShowDataCity(true);
      })
      .catch((err) => {
        console.log(err.message);
        setShowDataCity(false);
      });
  }

  function transformCityData(data?: Number, specialChar?: String) {
    let transformedData: String;
    if (specialChar !== undefined) {
      transformedData = Number(data).toFixed() + specialChar;
    } else {
      transformedData = Number(data).toFixed();
    }

    return transformedData;
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="City name.."
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <button onClick={() => getWeather()}>Click me!</button>
      {showDataCity && (
        <ul className="city-data-container">
          <li>temp: {transformCityData(cityData?.temp, "°C")}</li>
          <li>feels_like: {transformCityData(cityData?.feels_like, "°C")}</li>
          <li>humidity: {transformCityData(cityData?.humidity, "%")}</li>
          <li>pressure: {transformCityData(cityData?.pressure, " hPa")}</li>
          <li>temp_max: {transformCityData(cityData?.temp_max, "°C")}</li>
          <li>temp_min: {transformCityData(cityData?.temp_min, "°C")}</li>
        </ul>
      )}
    </div>
  );
}

export default App;
