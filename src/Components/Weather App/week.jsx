import { useEffect, useState } from "react";
import "../Weather App/weatherApp.css";
import { useLocation, useNavigate } from "react-router-dom";
const Week = () => {
  const locations = useLocation();  // I used  useLocation hook to recived the state value from navigate hook
  const forecastDataes= locations.state.day;
  const [forecastData, setForecastData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(forecastDataes);
  const[selectedDayIndex,setSelectedDayIndex] =useState(0);


  const handleDayClick = (day,index) => {
    setSelectedDayIndex(index);
    setSelectedDay(day);
  };

  const element = locations.state.element;  //to fetch city value

  const api_key = "4e4d4fcb9eaf47738d0112645241801";

  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      try {
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${element}&days=7&aqi=no&alerts=no`;
        let response = await fetch(url);
        let data = await response.json();
        setForecastData(data.forecast.forecastday);   //API fetch for 7 days wether

        let surl = `https://api.weatherapi.com/v1/sports.json?key=${api_key}&q=${element}`;
        let sresponse = await fetch(surl);
        let sdata = await sresponse.json();   //API fetch for sports
        // console.log(sdata.football);
        setSportData(sdata.football);

       
        const location = document.getElementsByClassName("weather-location");   // I used DOM to extract the data from API
        const region = document.getElementsByClassName("region");
        const country = document.getElementsByClassName("country");

       
        location[0].innerHTML = data.location.name;   //this is used to update the old value to new value easyly
        region[0].innerHTML = "Region : " + data.location.region;
        country[0].innerHTML = "Country : " + data.location.country;
      } catch (err) {
        navigate("/erorr");
      }
    };
    search();
  }, [element, navigate]);  //dependancy fro useEffect

  const getDayName = (dateString) => {    // array of days names
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
        <button onClick={() => {navigate("/today", { replace: true, state: { element } })}}>Today</button>
        <button id="today"
            onClick={() => {navigate("/week", { replace: true, state: { element } })}}>Next 7 days</button>
    </div>


                                     {/* Here I am featching current day data from API and print in web page */}
      <div>
        <div className="day">
          {forecastData.map((day,index) => (
            <div
              key={day.date_epoch}
              style={{backgroundColor:index=== selectedDayIndex ? 'rgb(4, 243, 131)' :'rgb(76, 73, 73)'}} 
              className={`days ${selectedDay === day ? "selected" : ""}`}
              onClick={() => handleDayClick(day,index)}
            >
              <img src={day.day.condition.icon} alt="" />
              <p>{getDayName(day.date)}</p>
              <p>{day.day.condition.text}</p>
            </div>                                
          ))}
        </div>                                                    
                                 {/* When I clicked on particular day name it will help to show that day data only*/}
        {selectedDay && (
          <div className="selected-day-info">
            <div className="weather-temp">{selectedDay.day.avgtemp_c} °c</div>
            <div className="max_temp">
              Max Temp : {selectedDay.day.maxtemp_c} °C
            </div>
            <div className="min_temp">
              Min Temp : {selectedDay.day.mintemp_c} °C
            </div>
            <div className="direction_wind">
              Wind direction :{selectedDay.hour[1].wind_dir} kph
            </div>
            <div className="rain">
              Chances of Rain ? : {selectedDay.hour[1].chance_of_rain} %
            </div>
            <div className="visibility">
              Visibility : {selectedDay.hour[1].vis_km} km
            </div>
          </div>
        )}
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
              <p className="start">{match.start}</p>
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

export default Week;
