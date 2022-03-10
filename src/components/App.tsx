import { useState } from "react";
import getDataCity from "../services/api/CurrentWeather";
import getForecastDataCity from "../services/api/ForecastWeather";
import * as moment from "moment";

interface CityData {
  dt: String;
  name: String;
  country: String;
  description: String;
  icon: String;
  main: String;
  feels_like: Number;
  humidity: Number;
  pressure: Number;
  temp: Number;
  temp_max: Number;
  temp_min: Number;
  speed: Number;
}

function App() {
  const [cityData, setCityData] = useState<CityData>();
  const [city, setCity] = useState<String>("");
  const [showDataCity, setShowDataCity] = useState<Boolean>(false);
  const [forecastWeathers, setForecastWeathers] = useState<CityData[]>();

  function getWeather() {
    getDataCity(city)
      .then(({ data }) => {
        let mergeCityDatas: CityData;
        mergeCityDatas = Object.assign(
          data.list[0].main,
          data.list[0].wind,
          data.list[0].weather[0],
          data.list[0].sys
        );
        mergeCityDatas["name"] = data.list[0].name;
        setCityData(mergeCityDatas);
        console.log(data);
        setShowDataCity(true);
        getForecast();
        console.log(forecastWeathers);
      })
      .catch((err) => {
        console.log(err);
        setShowDataCity(false);
      });
  }

  function transformCityData(
    data?: Number,
    specialChar?: String,
    numberFixed?: number
  ) {
    let transformedData: String;
    transformedData = Number(data).toFixed(numberFixed) + specialChar;

    return transformedData;
  }

  function getForecast() {
    let mergeCityDatas: CityData[] = [];
    getForecastDataCity(city).then(({ data }) => {
      mergeCityDatas.push(
        data.list[2],
        data.list[10],
        data.list[18],
        data.list[26],
        data.list[34]
      );
      setForecastWeathers(mergeCityDatas);
    });
  }

  function getCurrentDate() {
    const formatedDate = moment().format("ll");
    return formatedDate;
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="City name.."
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => getWeather()}>Buscar</button>
      {showDataCity && (
        <>
          <ul className="city-data-container">
            <li>
              {cityData?.name}, {cityData?.country}
              <div>{getCurrentDate()}</div>
            </li>
            <li>temp: {transformCityData(cityData?.temp, "°C")}</li>
            <img
              src={`http://openweathermap.org/img/wn/${cityData?.icon}@2x.png`}
              alt=""
            />
            <li>{cityData?.description}</li>

            <li>feels_like: {transformCityData(cityData?.feels_like, "°C")}</li>
            <li>humidity: {transformCityData(cityData?.humidity, "%")}</li>
            <li>pressure: {transformCityData(cityData?.pressure, " hPa")}</li>
            <li>temp_max: {transformCityData(cityData?.temp_max, "°C")}</li>
            <li>temp_min: {transformCityData(cityData?.temp_min, "°C")}</li>
            <li>wind_speed: {transformCityData(cityData?.speed, " m/s", 1)}</li>
          </ul>

          <div>
            {forecastWeathers?.map((weather: any) => (
              <ul key={weather.dt}>
                <li>{moment(weather.dt_txt).locale("pt-br").format("ll")}</li>
                <li>
                  {
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  }
                </li>
                <li>{weather.weather[0].description}</li>
              </ul>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
