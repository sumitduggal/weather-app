import React from "react";

export type Main = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export enum WeatherIcon {
  Thunderstorm = "wi-thunderstorm",
  Drizzle = "wi-sleet",
  Rain = "wi-storm-showers",
  Snow = "wi-snow",
  Atmosphere = "wi-fog",
  Clear = "wi-day-sunny",
  Clouds = "wi-day-fog",
}

type Props = {
  city: string;
  country: string;
  main: Main;
  description: string;
  icon: string;
};

export const Weather = ({ city, icon, country, main, description }: Props) => {
  const getCelsius = (kelvin: number): number => Math.floor(kelvin - 275);

  const temp = getCelsius(main.temp);
  const temp_max = getCelsius(main.temp_max);
  const temp_min = getCelsius(main.temp_min);

  return (
    <div className="flex flex-col justify-center items-center py-10 space-y-10">
      <h1 className="text-5xl">
        {city} {country}
      </h1>
      <div className="flex flex-col space-y-3">
        <i className={`wi ${icon} display-1 text-6xl`} />
        <span>{description}</span>
      </div>
      <div className="text-2xl font-bold">{temp}&deg;</div>
      <div className="flex justify-between w-32 text-xl">
        <span>{temp_min}&deg;</span>
        <span>{temp_max}&deg;</span>
      </div>
    </div>
  );
};
