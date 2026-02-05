import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThermometerHalf, FaTint, FaWind, FaEye } from 'react-icons/fa';

const WeatherContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WeatherTitle = styled.h3`
  color: white;
  font-size: 16px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 10px;
`;

const WeatherDescription = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
  font-style: italic;
`;

const WeatherSource = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  text-align: center;
  margin-top: 10px;
`;

const SunTimes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
`;

const WeatherItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;

const WeatherIcon = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
`;

const WeatherValue = styled.span`
  font-weight: 600;
`;

const LoadingText = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
`;

const ErrorText = styled.div`
  color: rgba(255, 100, 100, 0.8);
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
`;

const WeatherWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location && location.trim()) {
      fetchWeatherData(location);
    } else {
      setWeatherData(null);
      setError(null);
    }
  }, [location]);

  const fetchWeatherData = async (loc) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call our backend API for weather simulation
      const response = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        // Fallback to simulated data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockWeatherData = {
          temperature: Math.round(Math.random() * 20 + 15), // 15-35°C
          humidity: Math.round(Math.random() * 40 + 40), // 40-80%
          windSpeed: Math.round(Math.random() * 15 + 5), // 5-20 km/h
          visibility: Math.round(Math.random() * 5 + 5) // 5-10 km
        };
        
        setWeatherData(mockWeatherData);
      }
    } catch (err) {
      // Fallback to simulated data on error
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockWeatherData = {
          temperature: Math.round(Math.random() * 20 + 15),
          humidity: Math.round(Math.random() * 40 + 40),
          windSpeed: Math.round(Math.random() * 15 + 5),
          visibility: Math.round(Math.random() * 5 + 5)
        };
        
        setWeatherData(mockWeatherData);
      } catch (fallbackErr) {
        setError('Unable to fetch weather data');
        console.error('Weather fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!location) {
    return (
      <WeatherContainer>
        <WeatherTitle>
          🌤️ Weather Info
        </WeatherTitle>
        <LoadingText>Enter location to see weather</LoadingText>
      </WeatherContainer>
    );
  }

  if (loading) {
    return (
      <WeatherContainer>
        <WeatherTitle>
          🌤️ Weather Info
        </WeatherTitle>
        <LoadingText>Loading weather data...</LoadingText>
      </WeatherContainer>
    );
  }

  if (error) {
    return (
      <WeatherContainer>
        <WeatherTitle>
          🌤️ Weather Info
        </WeatherTitle>
        <ErrorText>{error}</ErrorText>
      </WeatherContainer>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <WeatherContainer>
      <WeatherTitle>
        🌤️ {weatherData.location || location}
      </WeatherTitle>
      
      {weatherData.description && (
        <WeatherDescription>
          {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
        </WeatherDescription>
      )}
      
      <WeatherGrid>
        <WeatherItem>
          <WeatherIcon>
            <FaThermometerHalf />
          </WeatherIcon>
          <div>
            <WeatherValue>{weatherData.temperature}°C</WeatherValue>
            {weatherData.feelsLike && (
              <div style={{ fontSize: '10px', opacity: 0.7 }}>
                Feels {weatherData.feelsLike}°C
              </div>
            )}
          </div>
        </WeatherItem>
        
        <WeatherItem>
          <WeatherIcon>
            <FaTint />
          </WeatherIcon>
          <div>
            <WeatherValue>{weatherData.humidity}%</WeatherValue>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Humidity</div>
          </div>
        </WeatherItem>
        
        <WeatherItem>
          <WeatherIcon>
            <FaWind />
          </WeatherIcon>
          <div>
            <WeatherValue>{weatherData.windSpeed} km/h</WeatherValue>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Wind</div>
          </div>
        </WeatherItem>
        
        <WeatherItem>
          <WeatherIcon>
            <FaEye />
          </WeatherIcon>
          <div>
            <WeatherValue>{weatherData.visibility} km</WeatherValue>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Visibility</div>
          </div>
        </WeatherItem>
      </WeatherGrid>

      {weatherData.pressure && (
        <WeatherItem style={{ justifyContent: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '12px' }}>
            Pressure: {weatherData.pressure} hPa
          </span>
        </WeatherItem>
      )}

      {weatherData.rainfall > 0 && (
        <WeatherItem style={{ justifyContent: 'center', marginTop: '5px' }}>
          <span style={{ fontSize: '12px', color: '#4FC3F7' }}>
            🌧️ Rain: {weatherData.rainfall} mm/h
          </span>
        </WeatherItem>
      )}

      {weatherData.sunrise && weatherData.sunset && (
        <SunTimes>
          <span>🌅 {weatherData.sunrise}</span>
          <span>🌇 {weatherData.sunset}</span>
        </SunTimes>
      )}

      <WeatherSource>
        {weatherData.source === 'live' ? '🔴 Live Data' : '📊 Simulated Data'}
        {weatherData.note && (
          <div style={{ marginTop: '2px', fontSize: '9px' }}>
            {weatherData.note}
          </div>
        )}
      </WeatherSource>
    </WeatherContainer>
  );
};

export default WeatherWidget;