"use client";
import { CurrentWeatherContextT } from "@/app/Context/CurrentWeatherContext";
import React, { useContext } from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";

export default function CurrentWeatherComponent() {
  const { WeatherData, SunRise, SunSets } = useContext(CurrentWeatherContextT);
  return (
    <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
      <p className="pt-5">Current Weather</p>
      <div className="text-5xl flex justify-between pt-5">
        <div className="flex">
          {WeatherData?.main?.temp?.toFixed(0)}
          <TbTemperatureCelsius />
        </div>
        <img
          className="flex justify-end items-end text-end"
          src={
            WeatherData?.weather ? (
              `https://openweathermap.org/img/wn/${WeatherData?.weather[0]?.icon}@2x.png`
            ) : (
              <span>Loading..</span>
            )
          }
          alt="Weather icon"
        />
      </div>
      <div className="flex justify-end"></div>
      {WeatherData?.weather && <p>{WeatherData?.weather[0]?.description}</p>}

      <div className="border-b pt-5"></div>

      <h1 className="text-1xl text-start flex items-center gap-5 pt-5">
        <MdOutlineLocationOn />
        {WeatherData?.name} / {WeatherData?.sys?.country}
      </h1>
    </div>
  );
}
