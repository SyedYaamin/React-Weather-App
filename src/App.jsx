import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [weatherDataList, setWeatherDataList] = useState([]);

  const getWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=3d1ba16836e2056bc04fa3c99b49b305`;
      const response = await axios.get(url);

      setWeatherDataList((prevWeatherDataList) => [
        ...prevWeatherDataList,
        response.data
      ]);
      setInput('');
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold mt-8'>Weather App</h1>
      <div className='m-10 flex justify-center items-center'>
        <div className='w-[400px] min-h-[450px] rounded-2xl bg-blue-800'>
          <input className='p-2 pl-4 w-[16rem] mt-10 ml-8 rounded-tl-3xl rounded-bl-3xl' type="text" placeholder='Enter City' value={input} onChange={(e) => setInput(e.target.value)} />
          <button className='bg-slate-300 rounded-br-3xl rounded-tr-3xl p-2 w-[5rem]' onClick={getWeather}>Search</button>

          {weatherDataList.map((weatherData, index) => (
            <div key={index} className='p-10 gap-5 flex justify-center items-center'>
              <div className='bg-white w-[400px] min-h-[450px] rounded-2xl bg-blue-800'>
                <div className='mt-5 flex justify-center'>
                  <img className='w-[150px] h-[120px] bg-gray-500' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>
                <div className='mt-8'>
                  <h1 className="text-4xl font-semibold text-center">{weatherData.main.temp}°C</h1>
                  <h1 className="text-3xl font-semibold text-center">{weatherData.name}</h1>
                </div>
                <div className='flex justify-between items-center gap-32 mt-8 p-3'> 
                  <p className='font-semibold text-xl text-center'>Humidity: {weatherData.main.humidity}%</p>
                  <p className='font-semibold text-lg text-center'>Wind: {weatherData.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
