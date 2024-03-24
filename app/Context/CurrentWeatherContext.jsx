"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { GeoLocation } from "./GeoLocationContext";

export const CurrentWeatherContextT = createContext();
export default function CurrentWeatherContext({ children }) {
  const { Latitude, Longitude } = useContext(GeoLocation);
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
  const [WeatherData, setWeatherData] = useState("");
  const [SunRise, setSunRise] = useState("");
  const [SunSets, setSunSets] = useState("");
//  `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${APIKEY}&units=metric`
  async function GetCurrentWeather() {
    try {
      const TodayWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${APIKEY}&units=metric`
      );
     // console.log(TodayWeather?.data);
      setWeatherData(TodayWeather?.data);
      setSunRise(
        new Date(TodayWeather?.data?.sys?.sunrise * 1000).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )
      );
      setSunSets(
        new Date(TodayWeather?.data?.sys?.sunset * 1000).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (Latitude && Longitude) {
      GetCurrentWeather();
    }
    //console.log(WeatherData);
  }, [Latitude, Longitude]);

  return (
    <CurrentWeatherContextT.Provider
      value={{
        WeatherData,
        setWeatherData,
        SunRise,
        setSunRise,
        SunSets,
        setSunSets,
        Latitude,
        Longitude,
        APIKEY,
      }}
    >
      {children}
    </CurrentWeatherContextT.Provider>
  );
}
