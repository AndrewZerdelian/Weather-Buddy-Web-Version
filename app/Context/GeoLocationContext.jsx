"use client";
import React, { createContext, useEffect, useState } from "react";

export const GeoLocation = createContext();

export default function GeoLocationContext({ children }) {
  const [Latitude, setLatitude] = useState();
  const [Longitude, setLongitude] = useState();

  async function getClientLocation() {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
        //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getClientLocation();
  }, []);
  return (
    <GeoLocation.Provider
      value={{ GeoLocationContext, setLatitude, setLongitude ,Latitude , Longitude}}
    >
      {children}
    </GeoLocation.Provider>
  );
}
