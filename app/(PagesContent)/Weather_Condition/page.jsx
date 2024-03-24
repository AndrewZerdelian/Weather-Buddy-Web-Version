"use client";
import React, { useContext } from "react";
import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
import { WeeklyRequestByCityNameContext } from "@/app/Context/WeeklyRequestByCityName";
import R_Current_Weather from "@/app/Components/ReusableComponents/R_Current_Weather";
import R_Todays_HighLight from "@/app/Components/ReusableComponents/R_Todays_HighLight";
import R_Weekly_Forcast from "@/app/Components/ReusableComponents/R_Weekly_Forcast";
import R_Todays_Details from "@/app/Components/ReusableComponents/R_Todays_Details";
export default function Today() {
  const {
    rearrangedData,
    getdaysdetails,
    Days,
    FiveDaysForCast,
    WeeklySunRise,
    WeeklySunSets,
  } = useContext(WeeklyWeatheContext);
  const {
    SearchByCityName,
    Rearranged_Weekly_Request_By_City_Name,
    SavingDataInState,
    SunRise,
    SunSets,
    R_Days,
    getdaysdetailsByCityName, //////////////// THE ONE THAT TRIGGERS OTHER COUNTRIES BUTTON
  } = useContext(WeeklyRequestByCityNameContext);

  //console.log(Rearranged_Weekly_Request_By_City_Name);
  //console.log(R_Days);
  //console.log(SavingDataInState?.data?.list);
  return (
    <div>
      {SearchByCityName ? (
        <span>
          {R_Days?.dayOfWeek ? (
            <div className="bg-[#111013] h-vh grid grid-cols-12 text-white font-extrabold px-5 ">
              <R_Current_Weather
                Current_Weather={R_Days?.dayOfWeek + " Weather"}
                Main_Temp={R_Days?.entries[0]?.main?.temp.toFixed(0)} /////////////RESEARCHED ITEMS Changble weather
                State_Name={SavingDataInState?.data?.city?.name}
                Countries_Name={SavingDataInState?.data?.city?.country}
                Weather_Icon={R_Days?.entries[0]?.weather[0]?.icon}
                Weather_Condition={R_Days?.entries[0]?.weather[0]?.description}
              />
              <R_Todays_HighLight
                Sun_Rise={SunRise?.toString()}
                Sun_Sets={SunSets?.toString()}
                Wind_Speed={R_Days?.entries[0]?.wind?.speed.toFixed(1)}
                Humidity={R_Days?.entries[0]?.main?.humidity}
                Feels_Like={R_Days?.entries[0]?.main?.feels_like.toFixed(0)}
                VISIBILITY={R_Days?.entries[0]?.visibility} //////////FIX LATER
              />
              <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
                <p className="text-bold ">Weekly Forecast</p>
                <div className="grid items-center justify-center">
                  {Rearranged_Weekly_Request_By_City_Name.map(
                    (Weekly_Weather_Data, index) => (
                      <button
                        onClick={() =>
                          getdaysdetailsByCityName(
                            Weekly_Weather_Data?.dayOfWeek
                          )
                        }
                        key={index}
                      >
                        <R_Weekly_Forcast
                          Day_Of_The_Week={Weekly_Weather_Data?.dayOfWeek}
                          Image={
                            Weekly_Weather_Data.entries[0]?.weather[0]?.icon
                          }
                          Max_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_max.toFixed(
                            0
                          )}
                          Min_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_min.toFixed(
                            0
                          )}
                        />
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 mt-8 px-5 pt-5 rounded-2xl bg-[#1C1C1E]">
                <h1 className="text-2xl">Weathers Details</h1>
                <div className="grid md:grid-cols-8 grid-cols-1 pt-5 gap-5">
                  {R_Days?.entries?.slice(0, 8).map((Weekly, index) => {
                    //// THE WORKING ONE THAT RENDER THE DAYS  <h1>IS IT WORKING? </h1>
                    const Formated_Time = new Date(
                      Weekly.dt_txt
                    ).toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    });
                    return (
                      <R_Todays_Details
                        key={index}
                        Weather_Conditions={Weekly?.weather[0]?.main}
                        Main_Temp={Weekly?.main?.temp.toFixed(0)}
                        Image_For_Icon={Weekly?.weather[0]?.icon}
                        Formated_Time={Formated_Time}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#111013] h-vh grid grid-cols-12 text-white font-extrabold px-5 ">
              <R_Current_Weather
                Current_Weather={"Current Weather"}
                Main_Temp={SavingDataInState?.data?.list[0]?.main?.temp.toFixed(
                  0
                )} /////////////RESEARCHED ITEMS
                State_Name={SavingDataInState?.data?.city?.name}
                Countries_Name={SavingDataInState?.data?.city?.country}
                Weather_Icon={
                  SavingDataInState?.data?.list[0]?.weather[0]?.icon
                }
                Weather_Condition={
                  SavingDataInState?.data?.list[0]?.weather[0]?.description
                }
              />
              <R_Todays_HighLight
                Sun_Rise={SunRise?.toString()}
                Sun_Sets={SunSets?.toString()}
                Wind_Speed={SavingDataInState?.data?.list[0]?.wind?.speed.toFixed(
                  1
                )}
                Humidity={SavingDataInState?.data?.list[0]?.main?.humidity}
                Feels_Like={SavingDataInState?.data?.list[0]?.main?.feels_like.toFixed(
                  0
                )}
                VISIBILITY={rearrangedData[0]?.entries[0]?.visibility} //////////FIX LATER
              />
              <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
                <p className="text-bold ">Weekly Forecast</p>
                <div className="grid items-center justify-center">
                  {Rearranged_Weekly_Request_By_City_Name.map(
                    (Weekly_Weather_Data, index) => (
                      <button
                        onClick={() =>
                          getdaysdetailsByCityName(
                            Weekly_Weather_Data?.dayOfWeek
                          )
                        }
                        key={index}
                      >
                        <R_Weekly_Forcast
                          Day_Of_The_Week={Weekly_Weather_Data?.dayOfWeek}
                          Image={
                            Weekly_Weather_Data.entries[0]?.weather[0]?.icon
                          }
                          Max_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_max.toFixed(
                            0
                          )}
                          Min_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_min.toFixed(
                            0
                          )}
                        />
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 mt-8 px-5 pt-5 rounded-2xl bg-[#1C1C1E]">
                <h1 className="text-2xl">Weathers Details</h1>
                <div className="grid md:grid-cols-8 grid-cols-1 pt-5 gap-5">
                  {Rearranged_Weekly_Request_By_City_Name[0]?.entries?.map(
                    (Weekly, index) => {
                      //////THE ONE THAT SHOULD WORK ON DEFAULT////////??<h1>WHAT CAN I DOOOO ! BEFORE PRESSING ANY DAY DATES </h1>
                      const Formated_Time = new Date(
                        Weekly.dt_txt
                      ).toLocaleString("en-US", {
                        hour: "numeric",
                        hour12: true,
                      });
                      return (
                        <R_Todays_Details
                          key={index}
                          Weather_Conditions={Weekly?.weather[0]?.main}
                          Main_Temp={Weekly?.main?.temp.toFixed(0)}
                          Image_For_Icon={Weekly?.weather[0]?.icon}
                          Formated_Time={Formated_Time}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </span>
      ) : (
        <div>
          {Days?.dayOfWeek ? (
            <div className="bg-[#111013] h-vh grid grid-cols-12 text-white font-extrabold px-5 ">
              <R_Current_Weather
                Current_Weather={Days?.dayOfWeek + " Weather"}
                Main_Temp={Days?.entries[0]?.main?.temp.toFixed(0)} /////////DAYS TOGGLING ///////////////////////
                State_Name={FiveDaysForCast?.data?.city?.name}
                Countries_Name={FiveDaysForCast?.data?.city?.country}
                Weather_Icon={Days?.entries[0]?.weather[0]?.icon}
                Weather_Condition={Days?.entries[0]?.weather[0]?.description}
              />
              <R_Todays_HighLight
                Sun_Rise={WeeklySunRise?.toString()}
                Sun_Sets={WeeklySunSets?.toString()}
                Wind_Speed={Days?.entries[0]?.wind?.speed.toFixed(1)}
                Humidity={Days?.entries[0]?.main?.humidity}
                Feels_Like={Days?.entries[0]?.main?.feels_like.toFixed(0)}
                VISIBILITY={Days?.entries[0]?.visibility}
              />
              <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
                <p className="text-bold ">Weekly Forecast</p>
                <div className="grid items-center justify-center">
                  {rearrangedData?.map((Weekly_Weather_Data, index) => (
                    <button
                      onClick={() =>
                        getdaysdetails(Weekly_Weather_Data?.dayOfWeek)
                      }
                      key={index}
                    >
                      <R_Weekly_Forcast
                        Day_Of_The_Week={Weekly_Weather_Data?.dayOfWeek}
                        Image={Weekly_Weather_Data.entries[0]?.weather[0]?.icon}
                        Max_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_max.toFixed(
                          0
                        )}
                        Min_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_min.toFixed(
                          0
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 mt-8 px-5 pt-5 rounded-2xl bg-[#1C1C1E]">
                <h1 className="text-2xl">Weathers Details</h1>
                <div className="grid md:grid-cols-8 grid-cols-1 pt-5 gap-5">
                  {Days.entries?.slice(0, 8).map((Weekly, index) => {
                    const Formated_Time = new Date(
                      Weekly.dt_txt
                    ).toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    });
                    return (
                      <R_Todays_Details
                        key={index}
                        Weather_Conditions={Weekly?.weather[0]?.main}
                        Main_Temp={Weekly?.main?.temp.toFixed(0)}
                        Image_For_Icon={Weekly?.weather[0]?.icon}
                        Formated_Time={Formated_Time}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#111013] h-vh grid grid-cols-12 text-white font-extrabold px-5 ">
              <R_Current_Weather
                Current_Weather={"Current Weather"}
                Main_Temp={rearrangedData[0]?.entries[0]?.main?.temp.toFixed(0)} /////////BASIC HOME PAGE LOADED BY LAT LONG
                State_Name={FiveDaysForCast?.data?.city?.name}
                Countries_Name={FiveDaysForCast?.data?.city?.country}
                Weather_Icon={rearrangedData[0]?.entries[0]?.weather[0]?.icon}
                Weather_Condition={
                  rearrangedData[0]?.entries[0]?.weather[0]?.description
                }
              />
              <R_Todays_HighLight
                Sun_Rise={WeeklySunRise?.toString()}
                Sun_Sets={WeeklySunSets?.toString()}
                Wind_Speed={rearrangedData[0]?.entries[0]?.wind?.speed.toFixed(
                  1
                )}
                Humidity={rearrangedData[0]?.entries[0]?.main?.humidity}
                Feels_Like={rearrangedData[0]?.entries[0]?.main?.feels_like.toFixed(
                  0
                )}
                VISIBILITY={rearrangedData[0]?.entries[0]?.visibility}
              />
              <div className="col-span-12 md:col-span-3 mt-8 md:mr-5 px-6 bg-[#1C1C1E] pt-5 rounded-2xl">
                <p className="text-bold ">Weekly Forecast</p>
                <div className="grid items-center justify-center">
                  {rearrangedData?.map((Weekly_Weather_Data, index) => (
                    <button
                      onClick={() =>
                        getdaysdetails(Weekly_Weather_Data?.dayOfWeek)
                      }
                      key={index}
                    >
                      <R_Weekly_Forcast
                        Day_Of_The_Week={Weekly_Weather_Data?.dayOfWeek}
                        Image={Weekly_Weather_Data.entries[0]?.weather[0]?.icon}
                        Max_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_max.toFixed(
                          0
                        )}
                        Min_Temp={Weekly_Weather_Data?.entries[0]?.main?.temp_min.toFixed(
                          0
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 mt-8 px-5 pt-5 rounded-2xl bg-[#1C1C1E]">
                <h1 className="text-2xl">Weathers Details</h1>
                <div className="grid md:grid-cols-8 grid-cols-1 pt-5 gap-5">
                  {rearrangedData[0]?.entries
                    ?.slice(0, 8)
                    ?.map((Weekly, index) => {
                      const Formated_Time = new Date(
                        Weekly.dt_txt
                      ).toLocaleString("en-US", {
                        hour: "numeric",
                        hour12: true,
                      });
                      return (
                        <R_Todays_Details
                          key={index}
                          Weather_Conditions={Weekly?.weather[0]?.main}
                          Main_Temp={Weekly?.main?.temp.toFixed(0)}
                          Image_For_Icon={Weekly?.weather[0]?.icon}
                          Formated_Time={Formated_Time}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** OLD BEFORE USING REUSABLE COMPONENTS 
 * "use client";
import React, { useContext, useEffect } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { CurrentWeatherContextT } from "@/app/Context/CurrentWeatherContext";
import CurrentWeatherComponent from "@/app/Components/TodaysComponents/CurrentWeatherComponent/CurrentWeatherComponent";
import TodaysHighLightComponent from "@/app/Components/TodaysComponents/TodaysHighLightComponent/TodaysHighLightComponent";
import WeeklyForcastComponent from "@/app/Components/TodaysComponents/WeeklyForcastComponent/WeeklyForcastComponent";
import TodaysDetailsComponent from "@/app/Components/TodaysComponents/TodaysDetailsComponent/TodaysDetailsComponent";
import { WeeklyWeatheContext } from "@/app/Context/WeeklyWeatherContext";
import WeeklyDetailsComponent from "@/app/Components/AnotherDay/WeeklyDetailsComponent/WeeklyDetailsComponent";
import WeeksHighLightComponent from "@/app/Components/AnotherDay/WeeksHighLightComponent/WeeksHighLightComponent";
import WeekWeatherComponent from "@/app/Components/AnotherDay/WeekWeatherComponent/WeekWeatherComponent";
export default function Today() {
  const { WeatherData } = useContext(CurrentWeatherContextT);
  const { Days } = useContext(WeeklyWeatheContext);
  //console.log(Days);

  return (
    <div>
      {WeatherData?.main ? (
        <div>
          {Days.dayOfWeek ? (
            <div className="bg-[#111013] h-vh grid grid-cols-12 text-white font-extrabold px-5 ">
              <WeekWeatherComponent />
              <WeeksHighLightComponent />
              <WeeklyForcastComponent />
              <WeeklyDetailsComponent />
            </div>
          ) : (
            <div className="bg-[#111013] h-vh grid grid-cols-12 text-white font-extrabold px-5 ">
              <CurrentWeatherComponent />
              <TodaysHighLightComponent />
              <WeeklyForcastComponent />
              <TodaysDetailsComponent />
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#111013] h-svh text-white font-extrabold px-5 ">
          <Player
            autoplay
            loop
            src="https://lottie.host/f2d3d837-cfec-406b-bc2a-a1498bd9acf7/qOBTAEHtYP.json"
            style={{ height: "300px", width: "300px" }}
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
      )}
    </div>
  );
}

 */
