import axios from "axios";
import React, { useState } from "react";
import "./searchWeather.css";

const api = {
  key: "f0acfe6869b89704afd4166a7ad87e19",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const SearchWeather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          setWeather(res.data);
          setQuery("");
          console.log(weather);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const dateBuilder = (s) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <>
      <section
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 20
              ? "warm search_weather-section"
              : "warm search_weather-section cold"
            : "warm search_weather-section"
  //           if(typeof weather.main != "undefined"){
  //             if (weather.weather[0].main==='Clear') {
  //               'warm search_weather-section'
  //             }else if(weather.weather[0].main==='Clouds'){
  //               'search_weather-section cold'
  //             }else if(weather.weather[0].main==='Rain'){
  //               'search_weather-section rain'
  //             }else{
  // 'warm search_weather-section'
  //             };
  //           };
        }>
        <div className="blur-layer"></div>
        <div className="container">
          <div className="search_weather-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search city"
                className="search-bar"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>
            {typeof weather.main != "undefined" ? (
              <div className="right-boxes">
                <div className="search_location-boxes">
                  <div className="location-box">
                    <div className="location">
                      {weather.name} {weather.sys.country}
                    </div>
                    <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                </div>
                <div className="weather-box">
                  <div className="temperature">
                    {Math.round(weather.main.temp)}&deg;C
                    <img
                      className="weather_icon"
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].main}
                    />
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchWeather;
