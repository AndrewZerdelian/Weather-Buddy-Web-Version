"use client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useFormik } from "formik";
export const WeeklyRequestByCityNameContext = createContext();

export default function WeeklyRequestByCityName({ children }) {
  const [SearchByCityName, setSearchByCityName] = useState(false);
  const [City, setCity] = useState("");
  const [SavingDataInState, setSavingDataInState] = useState({});
  const [SunRise, setSunRise] = useState("");
  const [SunSets, setSunSets] = useState("");
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

  const Formik = useFormik({
    initialValues: {
      citytype: "",
    },
    onSubmit: (values) => {
      setCity(values.citytype);
      console.log(values.citytype);
      console.log(values.citytype);
    },
  });
  async function GetWeeklyRequestByCityName(City) {
    try {
      const CityName = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${APIKEY}&units=metric`
      );
      console.log(CityName);
      setSearchByCityName(true);
      setSavingDataInState(CityName);
      setSunRise(
        new Date(CityName?.data?.city?.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setSunSets(
        new Date(CityName?.data?.city?.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
  ///////////////////////////////////////REARRANGED DATA/////////////////////////////////////////////////
  const [R_Days, setR_Days] = useState({});

  // Assuming GetWeeklyRequestByCityName is your API response
  const originalList = SavingDataInState?.data?.list;

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
  const Rearranged_Weekly_Request_By_City_Name = [];
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

    Rearranged_Weekly_Request_By_City_Name.push(dayObject);
  }

  // Function to handle click on a day button
  function getdaysdetailsByCityName(day) {
    const clickedDayData = Rearranged_Weekly_Request_By_City_Name.find(
      (item) => item.dayOfWeek === day
    );
    //console.log(clickedDayData);
    setR_Days(clickedDayData);
  }

  //console.log(Rearranged_Weekly_Request_By_City_Name);

  useEffect(() => {
    if (City) {
      GetWeeklyRequestByCityName(City);
    }
  }, [City]);

  return (
    <WeeklyRequestByCityNameContext.Provider
      value={{
        WeeklyRequestByCityName,
        SearchByCityName,
        City,
        Formik,
        SavingDataInState,
        SunRise,
        SunSets,
        Rearranged_Weekly_Request_By_City_Name,
        getdaysdetailsByCityName,
        R_Days,
      }}
    >
      {children}
    </WeeklyRequestByCityNameContext.Provider>
  );
}
