"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GeoLocation } from "./GeoLocationContext";
import axios from "axios";
///////////////////////////////////////////////////////////////

export const WeeklyWeatheContext = createContext();
export default function WeeklyWeatherContextT({ children }) {
  const { Latitude, Longitude } = useContext(GeoLocation);
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
  const [FiveDaysForCast, setFiveDaysForCast] = useState({});
  const [WeeklySunRise, setWeeklySunRise] = useState("");
  const [WeeklySunSets, setWeeklySunSets] = useState("");
  async function GetFiveDaysForCast() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${Longitude}&appid=${APIKEY}&units=metric`
      );
      //console.log(response);
      setFiveDaysForCast(response);
      setWeeklySunRise(
        new Date(response?.data?.city?.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setWeeklySunSets(
        new Date(response?.data?.city?.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (Latitude && Longitude) {
      GetFiveDaysForCast();
    }
  }, [Latitude, Longitude]);
  ///////////////////////////////////////REARRANGED DATA/////////////////////////////////////////////////
  const [Days, setDays] = useState({});
  //console.log(FiveDaysForCast);
  // Assuming FiveDaysForCast is your API response
  const originalList = FiveDaysForCast?.data?.list;

  // Helper function to get the day of the week or "Today" if it matches the current date
  const getDayOfWeek = (dateString, currentDate) => {
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
    const current = new Date(currentDate);
    if (date.toDateString() === current.toDateString()) {
      return "Today";
    } else {
      return daysOfWeek[date.getDay()];
    }
  };

  // Get current date
  const currentDate = new Date();

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
      dayOfWeek: getDayOfWeek(dayData[0].dt_txt, currentDate), // Get the day of the week or "Today"
      max_temp: maxTemp,
      min_temp: minTemp,
      entries: dayData, // Include the original entries for the day if needed
    };

    rearrangedData.push(dayObject);
  }

  // Function to handle click on a day button
  function getdaysdetails(day) {
    const clickedDayData = rearrangedData.find(
      (item) => item.dayOfWeek === day
    );
    //console.log(clickedDayData);
    setDays(clickedDayData);
  }

  //console.log(rearrangedData);
  return (
    <WeeklyWeatheContext.Provider
      value={{
        FiveDaysForCast,
        rearrangedData,
        getdaysdetails,
        Days,
        WeeklySunRise,
        WeeklySunSets,
        GetFiveDaysForCast,
      }}
    >
      {children}
    </WeeklyWeatheContext.Provider>
  );
}
