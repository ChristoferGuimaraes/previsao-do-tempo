import { useEffect, useState } from "react";
import getForecastDataCity from "../../services/api/ForecastWeather";
import moment from "moment";
import Loading from "../Loading";

interface CityData {
  icon: String;
  dt: String;
  dt_txt: String;
  description: String;
  temp: Number;
}

export default function Forecast({ cityName, cityData }: any) {
  const [forecastWeathers, setForecastWeathers] = useState<CityData[]>();

  useEffect(() => {
    let mergeCityDatas: CityData[] = [];
    getForecastDataCity(cityName).then(({ data }) => {
      mergeCityDatas.push(
        data.list[6],
        data.list[14],
        data.list[22],
        data.list[30],
        data.list[38]
      );
      setForecastWeathers(mergeCityDatas);
    });
  }, [cityData]);

  function transformCityData(
    data?: Number,
    specialChar?: String,
    numberFixed?: number
  ) {
    let transformedData: String;
    transformedData = Number(data).toFixed(numberFixed) + specialChar;

    return transformedData;
  }

  function upperCaseFirstLetter(word: any) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <>
      {forecastWeathers ? (
        <div className="forecast-container">
          {forecastWeathers?.map((weather: any) => (
            <div key={weather.dt} className="forecast-content">
              <span className="week-day">
                {moment(weather.dt_txt).format("dddd")}
              </span>
              <span>
                {
                  <img
                    className="weather-icon"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                  />
                }
              </span>
              <div className="forecast-temp-description">
                <span className="forecast-temp">
                  {transformCityData(weather.main.temp, "°C")}
                </span>
                <span className="forecast-description">
                  {upperCaseFirstLetter(weather.weather[0].description)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}
