import BackgroundImages from "../../assets/img/background-weather";

export default function Backgrounds({ data, className }: any) {
  function getBackgroundWeather(): string {
    //clear sky
    if (data?.icon === "01d") {
      return BackgroundImages.clear_sky.day;
    }

    if (data?.icon === "01n") {
      return BackgroundImages.clear_sky.night;
    }

    //few clouds
    if (data?.icon === "02d") {
      return BackgroundImages.few_clouds.day;
    }

    if (data?.icon === "02n") {
      return BackgroundImages.few_clouds.night;
    }

    //broken clouds and scattered clouds
    if (data?.icon === "03d" || data?.icon === "04d") {
      return BackgroundImages.broken_clouds.day;
    }

    if (data?.icon === "03n" || data?.icon === "04n") {
      return BackgroundImages.broken_clouds.night;
    }
    //rain
    if (data?.icon === "09d" || data?.icon === "10d") {
      return BackgroundImages.rain.day;
    }

    if (data?.icon === "09n" || data?.icon === "10n") {
      return BackgroundImages.rain.night;
    }
    //thunderstorm
    if (data?.icon === "11d") {
      return BackgroundImages.thunderstorm.day;
    }

    if (data?.icon === "11n") {
      return BackgroundImages.thunderstorm.night;
    }
    //snow
    if (data?.icon === "13d") {
      return BackgroundImages.snow.day;
    }

    if (data?.icon === "13n") {
      return BackgroundImages.snow.night;
    }
    //mist
    if (data?.icon === "50d") {
      return BackgroundImages.mist.day;
    }

    if (data?.icon === "50d") {
      return BackgroundImages.mist.night;
    }

    return BackgroundImages.default;
  }

  return <img className={className} src={getBackgroundWeather()} alt="" />;
}
