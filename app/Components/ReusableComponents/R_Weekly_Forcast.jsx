"use client";
import React from "react";

export default function R_Weekly_Forcast({
  getDayDetails,
  Max_Temp,
  Min_Temp,
  Day_Of_The_Week,
  Image,
}) {
  return (
    <div>
      <div className="grid items-center  justify-center">
        <div className="hover:bg-[#1A191C] grid grid-cols-3 text-center items-center  rounded-2xl">
          <p className="col-span-1">{Day_Of_The_Week}</p>
          <img
            className="col-span-1"
            src={`https://openweathermap.org/img/wn/${Image}@2x.png`}
            alt="Weather Icon"
          />
          <p className="col-span-1">
            {Max_Temp}/{Min_Temp}
          </p>
        </div>
      </div>
    </div>
  );
}
