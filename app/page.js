"use client";
import React, { useContext } from "react";
import Today from "./(PagesContent)/Weather_Condition/page";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import { WeeklyWeatheContext } from "./Context/WeeklyWeatherContext";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function page() {
  //const { SearchByCityName } = useContext(WeeklyRequestByCityNameContext);
  const { rearrangedData } = useContext(WeeklyWeatheContext);
  //console.log(rearrangedData);
  return (
    <div>
      {rearrangedData[0]?.dayOfWeek ? (
        <div>
          
          <Today />
          
        </div>
      ) : (
        <div className="bg-[#111013] h-svh px-5">
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

/**
  return (
    <div>
      {SearchByCityName ? (
        <div className="bg-[#111013] text-white">
          <NavBar />
         <Today/>
          <Footer />
        </div>
      ) : (
        <div className="bg-[#111013] text-white">
          <NavBar />
          <Today />
          <Footer />
        </div>
      )}
    </div>
  );
}
 */
