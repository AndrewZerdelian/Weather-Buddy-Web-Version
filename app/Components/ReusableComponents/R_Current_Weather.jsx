"use client";
import { CurrentWeatherContextT } from "@/app/Context/CurrentWeatherContext";
import React, { useContext } from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";

export default function R_Current_Weather({
  Main_Temp,
  Weather_Icon,
  Weather_Condition,
  Countries_Name,
  State_Name,
  Current_Weather,
}) {
  //const { WeatherData, SunRise, SunSets } = useContext(CurrentWeatherContextT);

  return (
    <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
      <p className="pt-5">{Current_Weather}</p>
      <div className="text-5xl flex justify-between pt-5">
        <div className="flex">
          {Main_Temp}
          <TbTemperatureCelsius />
        </div>
        <img
          className="flex justify-end items-end text-end"
          src={`https://openweathermap.org/img/wn/${Weather_Icon}@2x.png`}
          alt="Weather icon"
        />
      </div>
      <div className="flex justify-end"></div>
      {Weather_Condition}
      <div className="border-b pt-5"></div>
      <h1 className="text-1xl text-start flex items-center gap-5 pt-5">
        <MdOutlineLocationOn />
        {State_Name} / {Countries_Name}
      </h1>
    </div>
  );
}
