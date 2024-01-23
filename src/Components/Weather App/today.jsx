import { useEffect, useState } from "react";
import "../Weather App/weatherApp.css";
import { useLocation, useNavigate } from "react-router-dom";
const Today = () => {
  const locations = useLocation(); // I used  useLocation hook to recived the state value from navigate hook
  const [forecastData, setForecastData] = useState([]);
  const [sportData, setSportData] = useState([]);
 
  const element = locations.state.element; //to fetch city value

  const api_key = "4e4d4fcb9eaf47738d0112645241801";

  const navigate = useNavigate();


  useEffect(() => {
    const search = async () => {
      try {
        let url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${element}&aqi=no&days=1`;
        let response = await fetch(url);
        let data = await response.json();           //API fetch for current day wether

        setForecastData(data.forecast.forecastday);

        let surl = `http://api.weatherapi.com/v1/sports.json?key=${api_key}&q=${element}`;
        let sresponse = await fetch(surl);
        let sdata = await sresponse.json();        //API fetch for sports
        // console.log(sdata.football);
        setSportData(sdata.football);

        const temprature = document.getElementsByClassName("weather-temp")   // I used DOM to extract the data from API
        const location = document.getElementsByClassName("weather-location");
        const region = document.getElementsByClassName("region");
        const country = document.getElementsByClassName("country");

        temprature[0].innerHTML=data.current.temp_c+"°c" //this is used to update the old value to new value easyly
        location[0].innerHTML = data.location.name;
        region[0].innerHTML = "Region : " + data.location.region;
        country[0].innerHTML = "Country : " + data.location.country;
      } 
      
      catch (err) {
        navigate("/erorr");  
      }
    };
    search();
  },[element,navigate]); //dependancy fro useEffect

  const getDayName = (dateString) => {      // array of days names
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
    return daysOfWeek[date.getDay()]; // Here I am extracting the date from API
  };

  //   console.log(forecastData)

  return (
    <div className="container">
      <div className="nav">
        <button onClick={() => {
              navigate("/")}}>goto home</button>    {/* this is used to go back to HOme page i.e weather app */} 
              
      </div>
      <div className="weather-location">City Name</div>
      <div className="region">region</div>
      <div className="country">country</div>

      <div className="forcast">
        <h1>Forecast</h1>
        <button id="today" onClick={() => {navigate("/today", { replace: true, state: { element } })}}>Today</button>
        <>
        {forecastData.map((day) => (
        <button onClick={() => {navigate("/week", {replace: true,state: { element, day }})}}>Next 7 days</button>
       ))}
      </>
    </div>

      <div>
        <>
          {forecastData.map((day) => (        
            <>
              <div className="day">
                <div key={day.date_epoch} className="days">
                  <img src={day.day.condition.icon} alt="" />
                  <p>{getDayName(day.date)}</p>
                  <p>{day.day.condition.text}</p>
                </div>
              </div>                    {/* Here I am featching current day data from API and print in web page */}
            
            </>
          ))}
        </>
        <div className="weather-temp">00°c</div>
        {forecastData.map((day) =>(
          <div className="selected-day-info">
           
            <div className="max_temp">
              Max Temp : {day.day.maxtemp_c} °C
            </div>
            <div className="min_temp">
              Min Temp : {day.day.mintemp_c} °C
            </div>
            <div className="direction_wind">
              Wind direction :{day.hour[1].wind_dir} kph
            </div>
            <div className="rain">
              Chances of Rain ? : {day.hour[1].chance_of_rain} %
            </div>
            <div className="visibility">
              Visibility : {day.hour[1].vis_km} km
            </div>
          </div>
        ))}
      </div>

      <div className="sport">
        <h1>Sport in Your Vicinity</h1>
        <p>plan your trip accordingly</p>
        <h1>Football</h1>

        <div className="sports">
          {sportData.slice(0, 3).map((match, index) => (
            <div key={index} className="football-match">
              <p>Tournament : {match.tournament}</p>
              <p>Stadium : {match.stadium}</p>
              <p>{match.match}</p>
              <p className="start">{match.start}</p>    {/* Here I am featching current sports data from API and print in web page */}
            <></>
            </div>
          ))}
        </div>
      </div>
      <div className="copyright-container">
      <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved by @PKM❤️. Powered by Weather App.</p>
    </div>
    </div>
  );
};

export default Today;
