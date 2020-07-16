import React, { useState } from "react";
import "./App.css";

// You need to run this command
// REACT_APP_OPENWEATHERMAP_API_KEY=2c15e16ab21e2ac37c7a627756f01940 npm start
const API_KEY = '2c15e16ab21e2ac37c7a627756f01940';
export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getWeather = (cityName) => {
    console.log(process.env.REACT_APP_OPENWEATHERMAP_API_KEY);
    const END_POINT = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    fetch(END_POINT)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const {
          name,
          sys: { country },
          main: { temp_max, temp_min },
          weather: [{ main, description }],
          coord: { lat, lon },
        } = data;
        setData({
          name,
          country,
          main,
          description,
          lat,
          lon,
          temp_max,
          temp_min,
        });
        setLoading(true);
      })
      .catch((err) => {
        setHasError(true);
      });
  };

  function handleChange(event) {
    setCity({
      ...city,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeather(city.name);
    event.target.reset();
  }

  return (
    <div className="container">
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Search City"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {loading && !hasError && <CityWeather data={data} />}
      <div style={{color: "red"}}>{hasError && <p>Something get wrong</p>}</div>
    </div>
  );
}

function CityWeather({ data }) {
  console.log(data);
  return (
    <div className="cityCard">
      <h2>
        {data.name}, {data.country}
      </h2>
      <div>
        <h3> {data.main}</h3>
        <span>{data.description}</span>
      </div>
      <div>
        <p>min temp : {data.temp_min}</p>
        <p>max temp : {data.temp_max}</p>
        <p>
          location : {data.lat} {data.lon}
        </p>
      </div>
    </div>
  );
}
