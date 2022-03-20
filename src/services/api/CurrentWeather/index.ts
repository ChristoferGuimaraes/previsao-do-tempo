import axios from "axios";

export default async function getDataCity(city: String) {
  const api = await axios.get(
    `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=e863512a1b8618d4f8ad6ad12979df92`
  );
  return api;
}


