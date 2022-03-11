import { useState } from "react";
import getDataCity from "../services/api/CurrentWeather";
import "./App.css";
import * as moment from "moment";
import Forecast from "../components/Forecast";

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

  function getCurrentDate() {
    const formatedDate = moment().format("LL");
    return formatedDate;
  }

  function upperCaseFirstLetter(word: any) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="City name.."
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => getWeather()}>Buscar</button>
      {showDataCity && (
        <>
          <div className="city-data-container">
            <div className="main-info-container">
              <div className="left-content">
                <span className="city-name">
                  {cityData?.name}, {cityData?.country}
                </span>
                <div className="city-current-date">{getCurrentDate()}</div>
                <img
                  style={{ width: "100px" }}
                  src={`http://openweathermap.org/img/wn/${cityData?.icon}@2x.png`}
                  alt=""
                />
                <span>{upperCaseFirstLetter(cityData?.description)}</span>
              </div>

              <div className="right-content">
                <div className="today-temp-container">
                <span className="current-temp">
                  {transformCityData(cityData?.temp, "°C")}
                </span>
                <div className="min-max-temp">
                  <span>
                    {`${transformCityData(
                      cityData?.temp_max,
                      "°C"
                    )} / ${transformCityData(cityData?.temp_min, "°C")}`}
                  </span>
                </div>
              </div>
              </div>
            
            </div>
            {/* <span>
              feels_like: {transformCityData(cityData?.feels_like, "°C")}
            </span>
            <span>humidity: {transformCityData(cityData?.humidity, "%")}</span>
            <span>
              pressure: {transformCityData(cityData?.pressure, " hPa")}
            </span>

            <span>
              wind_speed: {transformCityData(cityData?.speed, " m/s", 1)}
            </span> */}
          </div>

          <Forecast cityName={city} cityData={cityData} />
        </>
      )}
    </div>
  );
}

export default App;
