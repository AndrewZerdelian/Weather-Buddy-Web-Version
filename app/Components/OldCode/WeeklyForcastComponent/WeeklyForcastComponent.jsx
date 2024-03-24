import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
import React, { useContext, useState } from "react";

export default function WeeklyForcastComponent() {
  const {  rearrangedData, getdaysdetails } =
    useContext(WeeklyWeatheContext);

  return (
    <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
      <p className="text-bold ">Weekly Forecast</p>
      <div className="items-center grid justify-center">
        {rearrangedData.map((weeklyWeather, index) => (
          <button
            onClick={() => getdaysdetails(weeklyWeather.dayOfWeek)} // Pass the dayOfWeek value to handleClick
            key={index}
            className="grid grid-cols-3 text-center items-center hover:bg-[#1A191C] rounded-2xl"
          >
            <p className="col-span-1">{weeklyWeather.dayOfWeek}</p>
            <img
              className="col-span-1"
              src={`https://openweathermap.org/img/wn/${weeklyWeather?.entries[0]?.weather[0]?.icon}@2x.png`}
              alt="Weather Icon"
            />
            <p className="col-span-1">
              {weeklyWeather.max_temp.toFixed(0)}/
              {weeklyWeather.min_temp.toFixed(0)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 *  const { FiveDaysForCast } = useContext(WeeklyWeatheContext);
  console.log(FiveDaysForCast);
  // Assuming FiveDaysForCast is your API response
  const originalList = FiveDaysForCast?.data?.list;

  // Helper function to get the day of the week
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  // Group data by days and calculate max_temp/min_temp for each day
  const rearrangedData = [];
  for (let i = 0; i < originalList?.length; i += 8) {
    const dayData = originalList?.slice(i, i + 8);

    // Calculate max_temp and min_temp for the day
    const maxTemp = Math.max(...dayData.map((item) => item.main.temp_max));
    const minTemp = Math.min(...dayData.map((item) => item.main.temp_min));

    // Create a new object for the day
    const dayObject = {
      date: dayData[0].dt_txt, // You might want to format the date as needed
      dayOfWeek: getDayOfWeek(dayData[0].dt_txt), // Get the day of the week
      max_temp: maxTemp,
      min_temp: minTemp,
      entries: dayData, // Include the original entries for the day if needed
    };

    rearrangedData.push(dayObject);
  }

  // Now, rearrangedData contains the data grouped by days with max_temp/min_temp, dayOfWeek, and date
  console.log(rearrangedData);
 */
