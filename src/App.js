
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './Components/Weather App/erorr';
import WeatherApp from './Components/Weather App/weatherApp';
import Today from './Components/Weather App/today';
import Week from './Components/Weather App/week';


function App() {
  return (
    <div className="App">


      <BrowserRouter>
      <Routes>
        
        <Route element={<WeatherApp/>}  path='/*'/>
        <Route element={<Error/>} path='/erorr' />
        <Route element={<Today/>} path='/today' />
        <Route element={<Week/>} path='/week' />

      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
