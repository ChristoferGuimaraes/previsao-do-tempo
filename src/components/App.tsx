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

  useEffect(() => {
    getDataCity("London")
      .then(({ data }) => setCityData(data.list[0].main))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div>{cityData?.temp}</div>
      <div>{cityData?.feels_like}</div>
      <div>{cityData?.humidity}</div>
      <div>{cityData?.pressure}</div>
      <div>{cityData?.temp_max}</div>
      <div>{cityData?.temp_min}</div>
    </div>
  );
}

export default App;
