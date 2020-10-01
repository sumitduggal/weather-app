import React, { useCallback } from "react";
import "weather-icons/css/weather-icons.css";

import { Main, Weather, WeatherIcon } from "./components/Weather";
import { BASE_API_URL } from "./utils/constants";

const getWeatherIcon = (rangeId: number) => {
  let weatherIcon;
  switch (true) {
    case rangeId >= 200 && rangeId < 232:
      weatherIcon = WeatherIcon.Thunderstorm;
      break;
    case rangeId >= 300 && rangeId <= 321:
      weatherIcon = WeatherIcon.Drizzle;
      break;
    case rangeId >= 500 && rangeId <= 521:
      weatherIcon = WeatherIcon.Rain;
      break;
    case rangeId >= 600 && rangeId <= 622:
      weatherIcon = WeatherIcon.Snow;
      break;
    case rangeId >= 701 && rangeId <= 781:
      weatherIcon = WeatherIcon.Atmosphere;
      break;
    case rangeId === 800:
      weatherIcon = WeatherIcon.Clear;
      break;
    case rangeId >= 801 && rangeId <= 804:
      weatherIcon = WeatherIcon.Clouds;
      break;
    default:
      weatherIcon = WeatherIcon.Clouds;
      break;
  }

  return weatherIcon;
};

function App() {
  const [city, setCity] = React.useState<string>("London");
  const [country, setCountry] = React.useState<string>("uk");
  const [icon, setIcon] = React.useState<WeatherIcon>(WeatherIcon.Clear);
  const [main, setMain] = React.useState<Main>({
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  });
  const [description, setDescription] = React.useState<string>("uk");
  // const [error, setError] = React.useState<string>("uk");

  const getWeatherData = useCallback(async (city, country) => {
    const API_URL = `${BASE_API_URL}${city},${country}&appid=${process.env.REACT_APP_API_KEY}`;
    const response = await (await fetch(API_URL)).json();

    if (response) {
      setCity(response.name);
      setCountry(response.sys.country);
      setMain(response.main);
      setDescription(response.weather[0].description);
      setIcon(getWeatherIcon(response.weather[0].id));
    }
  }, []);

  React.useEffect(() => {
    getWeatherData(city, country);
  }, [city, country, getWeatherData]);

  return (
    <div className="container mx-auto h-full">
      <Weather {...{ city, icon, country, main, description }} />
    </div>
  );
}

export default App;
