import { useState } from "react";
import getDataCity from "../services/api/CurrentWeather";
import "../assets/styles/App.css";
import moment from "moment";
import Forecast from "../components/Forecast";
import Backgrounds from "../components/Backgrounds";
import { FaTemperatureLow, FaWind, FaArrowCircleDown } from "react-icons/fa";
import { ImDroplet } from "react-icons/im";

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
  const [dailyContent, setDailyContent] = useState<Boolean>(true);
  const [detailsContent, setDetailsContent] = useState<Boolean>(false);
  const [message, setMessage] = useState<String>("Enter a city name");


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
        setShowDataCity(true);
      })
      .catch((err) => {
        console.log(err);
        setShowDataCity(false);
        setMessage("This city does not exist!");
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

  function styleDailySelected() {
    if (!dailyContent) {
      return { borderBottom: "1px solid transparent" };
    }
  }

  function styleDetailsSelected() {
    if (!detailsContent) {
      return { borderBottom: "1px solid transparent" };
    }
  }

  return (
    <div className="app-container">
      <div className="title-input-btn-container">
        <div className="title-app">
          <h1>Weather App</h1>
        </div>
        <div className="btn-input-container">
          <div className="input-search">
            <input
              type="text"
              placeholder="City name"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button onClick={() => getWeather()}>Search</button>
        </div>
      </div>

      <div className="main-container">
        <div className="img-holder">
          <Backgrounds className={"bg-image-container"} data={cityData} />
        </div>
        {showDataCity ? (
          <>
            <div className="city-data-container">
              <div className="main-info-container">
                <div className="left-content">
                  <span className="city-name">
                    {cityData?.name}, {cityData?.country}
                  </span>
                  <div className="city-current-date">{getCurrentDate()}</div>
                  <img
                    className="weather-icon"
                    style={{ width: "100px" }}
                    src={`http://openweathermap.org/img/wn/${cityData?.icon}@2x.png`}
                    alt=""
                  />
                  <span className="current-weather-description">
                    {upperCaseFirstLetter(cityData?.description)}
                  </span>
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
            </div>

            <div className="footer-content">
              <div className="daily-details-container">
                <ul>
                  <li
                    className="content daily"
                    style={styleDailySelected()}
                    onClick={() => {
                      setDailyContent(true);
                      setDetailsContent(false);
                    }}
                  >
                    Daily
                  </li>
                  <li
                    className="content details"
                    style={styleDetailsSelected()}
                    onClick={() => {
                      setDetailsContent(true);
                      setDailyContent(false);
                    }}
                  >
                    Details
                  </li>
                </ul>
              </div>
              <div className="scroll-container">
                {dailyContent && (
                  <Forecast cityName={city} cityData={cityData} />
                )}

                {detailsContent && (
                  <div className="details-container">
                    <div className="detail-content-container">
                      <span className="details-icons">
                        <FaTemperatureLow /> <span>Feels Like</span>
                      </span>
                      <span className="detail-data">
                        {transformCityData(cityData?.feels_like, "°C")}
                      </span>
                    </div>
                    <div className="detail-content-container">
                      <span className="details-icons">
                        <ImDroplet /> <span>Humidity</span>
                      </span>
                      <span className="detail-data">
                        {transformCityData(cityData?.humidity, "%")}
                      </span>
                    </div>

                    <div className="detail-content-container">
                      <span className="details-icons">
                        <FaArrowCircleDown /> <span>Pressure</span>
                      </span>
                      <span className="detail-data">
                        {transformCityData(cityData?.pressure, " hPa")}
                      </span>
                    </div>
                    <div className="detail-content-container last-container">
                      <span className="details-icons">
                        <FaWind /> <span>Wind</span>
                      </span>
                      <span className="detail-data">
                        {transformCityData(cityData?.speed, " m/s", 1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="initial-and-error-msg-container">
            <h1 className="initial-and-error-msg">{message}</h1>
          </div>
        )}
      </div>
      <footer style={{ fontSize: "13px'" }}>
        <a href="https://github.com/ChristoferGuimaraes" target="_blank">
          &copy; github.com/ChristoferGuimaraes
        </a>
      </footer>
      <Backgrounds className={"bg-image"} data={cityData} />
    </div>
  );
}

export default App;
