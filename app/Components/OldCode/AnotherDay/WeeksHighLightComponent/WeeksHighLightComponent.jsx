import { AirPollutionContextT } from "@/app/Context/AirPollutionContext";
import { CurrentWeatherContextT } from "@/app/Context/CurrentWeatherContext";
import React, { useContext } from "react";
import { FiWind } from "react-icons/fi";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity, WiWindy } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
export default function WeeksHighLightComponent() {
  const { AirPollution } = useContext(AirPollutionContextT);
  const { WeatherData, SunRise, SunSets } = useContext(CurrentWeatherContextT);
  const { Days } = useContext(WeeklyWeatheContext);
  //Days?.entries[0]?.main?.humidity?
  return (
    <div className="col-span-12 md:col-span-9 mt-8 px-6 bg-[#1C1C1E] py-5 rounded-2xl">
      <h1 className="text-2xl ">{Days.dayOfWeek} HighLights</h1>
      <div className="grid md:grid-cols-12 gap-5 pt-5">
        <div className="col-span-12 pl-6 bg-[#1A191C] py-5 rounded-2xl">
          <span> Sunrise & Sunset</span>
          <div className="grid grid-cols-6 justify-between">
            <div className="col-span-3">
              Sunrise
              <div className="text-3xl flex gap-5">
                <FiSunrise />
                {SunRise.toString()}
              </div>
            </div>
            <div className="col-span-3">
              <span>Sunset</span>
              <div className="text-3xl flex gap-5">
                <FiSunset />
                {SunSets.toString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-12 pt-5 gap-5 ">
        <div className="col-span-3 bg-[#1A191C]  pl-6 rounded-2xl py-5">
          Humidity
          <div className="text-3xl flex gap-5 pt-5">
            <WiHumidity className="" />
            <div className="flex items-end">
              {Days?.entries[0]?.main?.humidity}
              <span className="text-xl">%</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-[#1A191C] pl-6 rounded-2xl py-5">
          Wind
          <div className="text-3xl flex gap-5 pt-5">
            <WiWindy />
            <div>
              {Days?.entries[0]?.wind?.speed.toFixed(1)}
              <span className="text-xl">k/h</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-[#1A191C] pl-6 rounded-2xl py-5">
          Visibility
          <div className="text-3xl flex gap-5 pt-5">
            <MdOutlineVisibility />
            <div>
              {`${Days?.entries[0]?.visibility
                ?.toString()
                ?.slice(0, -3)}.${Days?.entries[0]?.visibility
                ?.toString()
                ?.slice(-3, -2)}`}
              <span className="text-xl">KM</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-[#1A191C] pl-6 rounded-2xl py-5">
          Feels Like
          <div className="text-3xl flex gap-5 pt-5">
            <FaTemperatureHigh />
            <div className="flex items-end">
              {Days?.entries[0]?.main?.feels_like.toFixed(1)}
              <span className="text-1xl ">
                <TbTemperatureCelsius />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
