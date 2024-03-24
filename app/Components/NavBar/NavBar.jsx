"use client";
import { WeeklyRequestByCityNameContext } from "@/app/Context/WeeklyRequestByCityName";
import React, { useContext } from "react";
import { GiSunCloud } from "react-icons/gi";
import Link from "next/link";
import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
export default function NavBar() {
  const { Formik } = useContext(WeeklyRequestByCityNameContext);
  return (
    <div
      className="flex flex-col items-center bg-[#111013] gap-8 p-5
      md:navbar md:flex-row md:justify-between text-white"
    >
      <button
        onClick={() => window.location.reload()}
        className="font-extrabold text-2xl gap-5 flex items-center"
      >
        Weather Buddy <GiSunCloud className="text-5xl " />
      </button>
      <form className="flex gap-5 p-5" onSubmit={Formik.handleSubmit}>
        <input
          id="citytype"
          name="citytype"
          type="citytype"
          onChange={Formik.handleChange}
          value={Formik.values.citytype}
          placeholder="Search by city... "
          className="input w-30 md:w-auto bg-transparent text-white rounded-full focus:outline-black text-center"
        />
        <button className="btn btn-success text-white" type="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

/**
 *       <button className="btn btn-success">
        <TbCurrentLocation className="text-xl" /> Current Location
      </button>

        //navbar flex justify-between items-center bg-gray-500
 */
