import { useEffect, useState } from "react";
import "../Weather App/weatherApp.css";
import { useNavigate } from "react-router-dom";

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [element, setElement] = useState(""); //location city

  const handleInputChange = (e) => {          //this function is used to recive value from search input when clicked
    const value = e.target.value;
    setSearchTerm(value);
    setElement(value); 
  };

  const api_key = "4e4d4fcb9eaf47738d0112645241801";
  useEffect(() => {
    const fetchSuggestions = async () => {       //It hepls to give suggestion array based on search text
      try {
        if (searchTerm.trim() === "") {
          setSuggestions([]);
          return;
        }

        const url = `http://api.weatherapi.com/v1/search.json?key=${api_key}&q=${searchTerm}`;
        const response = await fetch(url);
        const data = await response.json(); // API fetching

        setSuggestions(data.map((location) => location.name));
      } catch (error) {
        console.error("Error fetching location suggestions:", error); //if search element is not present in API then it throws an exception i.e error message
      }
    };

    const debounceTimer = setTimeout(() => {     //time interval for search suggestion
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);   // kill the time interval
  }, [searchTerm, api_key]);    //dependancy for useEffect

  const handleSuggestionClick = (selectedLocation) => {
    setSearchTerm("");
    setSuggestions([]);
    setElement(selectedLocation);
    navigate('/today',{replace:true,state:{element}}) //when you clicked on suggest element then it goes to next component direcly
  };

  return (                                          // HTML code
    <div className="container">
      <div className="top-bar">
      <form onSubmit={handleSuggestionClick}>
        <div className="top-bar">
          <input
            className="cityInput"
            autoComplete="off"
            placeholder="Search the location"
            type="text"
            name=""
            id=""
            value={searchTerm}
            onChange={handleInputChange}
          />
          <input
            className="search-icon"
            type="submit"
            value=""
          />
        </div>
      </form>
        <div className="suggestions">
          {suggestions.map((location, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(location)}
            >
              {location}
            </div>
          ))}
        </div>
        
      </div>

      <div className="extra">
        <p className="p1">Welcome To Weather Application</p>
      </div>
      <div className="copyright-container">
      <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved by @PKM❤️. Powered by Weather App.</p>
    </div>
    </div>
  );
};

export default WeatherApp;
