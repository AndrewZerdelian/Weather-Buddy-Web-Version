import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
import React, { useContext } from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
export default function WeeklyDetailsComponent() {
  const { Days } = useContext(WeeklyWeatheContext);
  //console.log(FiveDaysForCast);
  //console.log(Days);
  return (
    <div className="col-span-12 md:col-span-9 mt-8 px-5 pt-5 rounded-2xl bg-[#1C1C1E]">
      <h1 className="text-2xl">{Days.dayOfWeek} Details</h1>
      <div className="grid md:grid-cols-8 grid-cols-1 justify-center items-center pt-5 gap-5">
        {Days.entries?.slice(0, 8).map((Weekly, index) => {
          // Format the time to AM/PM
          const formattedTime = new Date(Weekly.dt_txt).toLocaleString(
            "en-US",
            {
              hour: "numeric",
              hour12: true,
            }
          );
          return (
            <div
              className="col-span-1 text-center bg-[#1A191C] rounded-2xl py-5" // Center the card
              key={index}
            >
              <div className="grid grid-cols-3 md:grid-cols-1 text-center items-center">
                <p className="col-span-1">{formattedTime}</p>
                <p className="col-span-1 hidden md:block">
                  {Weekly?.weather[0]?.main}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${Weekly?.weather[0]?.icon}@2x.png`}
                  className="mx-auto col-span-1" // Center the image
                />
                <div className="flex justify-center items-end col-span-1">
                  {Weekly?.main?.temp.toFixed(0)}
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
