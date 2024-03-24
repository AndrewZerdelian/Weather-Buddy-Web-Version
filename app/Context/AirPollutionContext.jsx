"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GeoLocation } from "./GeoLocationContext";
export const AirPollutionContextT = createContext();
export default function AirPollutionContext({ children }) {
  const { Latitude, Longitude } = useContext(GeoLocation);
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
  const [AirPollution, setAirPollution] = useState({});
  async function GetAirPollution() {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${Latitude}&lon=${Longitude}&appid=${APIKEY}`
      );
      //console.log(response);
      setAirPollution(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (Latitude && Longitude) {
      GetAirPollution();
    }
  }, [Latitude, Longitude]);
  return (
    <AirPollutionContextT.Provider value={{ AirPollution }}>
      {children}
    </AirPollutionContextT.Provider>
  );
}
