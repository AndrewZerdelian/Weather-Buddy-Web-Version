"use client";
import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
import React, { useContext } from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
export default function R_Todays_Details({
  Main_Temp,
  Image_For_Icon,
  Weather_Conditions,
  Formated_Time,
}) {
  return (
    <div className="grid justify-center items-end">
      <div className="col-span-1 text-center bg-[#1A191C] rounded-2xl py-5">
        <div className="grid grid-cols-3 md:grid-cols-1 text-center items-center">
          <p className="col-span-1">{Formated_Time}</p>
          <p className="col-span-1 hidden md:block">{Weather_Conditions}</p>
          <img
            src={`https://openweathermap.org/img/wn/${Image_For_Icon}@2x.png`}
            className="mx-auto col-span-1" // Center the image
          />
          <div className="flex justify-center items-end col-span-1">
            {Main_Temp}
            <TbTemperatureCelsius />
          </div>
        </div>
      </div>
    </div>
  );
}
