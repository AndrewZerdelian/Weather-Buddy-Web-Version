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
export default function TodaysHighLightComponent() {
  const { AirPollution } = useContext(AirPollutionContextT);
  const { WeatherData, SunRise, SunSets } = useContext(CurrentWeatherContextT);
  return (
    <div className="col-span-12 md:col-span-9 mt-8 px-6 bg-[#1C1C1E] py-5 rounded-2xl">
      <h1 className="text-2xl ">Todays HighLight</h1>
      <div className="grid md:grid-cols-12 gap-5 pt-5">
        <div className="col-span-6 pl-6 bg-[#1A191C] py-5 rounded-2xl">
          <span>Air Quality Index</span>
          {AirPollution ? (
            <div>
              {AirPollution?.data?.list?.map((Air, index) => {
                return (
                  <div key={index} className="grid grid-cols-10 pt-3">
                    <div className="col-span-2 grid justify-center items-center">
                      <FiWind className="text-4xl " />
                    </div>
                    <div className="col-span-2">
                      <h5>PM2.5</h5>
                      <p>{Air?.components?.pm2_5.toFixed(1)}</p>
                    </div>
                    <div className="col-span-2">
                      <h5>NO2</h5>
                      <p>{Air?.components?.no2.toFixed(1)}</p>
                    </div>
                    <div className="col-span-2">
                      <h5>CO</h5>
                      <p>{Air?.components?.co.toFixed(0)}</p>
                    </div>
                    <div className="col-span-2">
                      <h5>O3</h5>
                      <p>{Air?.components?.o3.toFixed(1)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="col-span-6 pl-6 bg-[#1A191C] py-5 rounded-2xl">
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
              {WeatherData?.main?.humidity}
              <span className="text-xl">%</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-[#1A191C] pl-6 rounded-2xl py-5">
          Wind
          <div className="text-3xl flex gap-5 pt-5">
            <WiWindy />
            <div>
              {WeatherData?.wind?.speed.toFixed(1)}
              <span className="text-xl">k/h</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-[#1A191C] pl-6 rounded-2xl py-5">
          Visibility
          <div className="text-3xl flex gap-5 pt-5">
            <MdOutlineVisibility />
            <div>
              {`${WeatherData?.visibility
                ?.toString()
                ?.slice(0, -3)}.${WeatherData?.visibility
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
              {WeatherData?.main?.feels_like.toFixed(1)}
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
