import axios from 'axios';

const API_KEY = 'cdbaa8237690cc5ba7c5e0acbf69623e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const BASE_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found');
    }
    throw error;
  }
};
export const fetchWeatherDataByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw error;
  }
};
export const fetchTimeFromCoordinates = async (lat, lon) => {
  const TIME_API_BASE_URL = `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`;
  try {
    const response = await axios.get(TIME_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching time data:', error);
    throw error;
  }
};
export const fetchCityData = async (cityName) => {
  try {
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/population/cities/q?city=${encodeURIComponent(cityName)}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return { data: { populationCounts: [{ value: 'N/A' }] } };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Unable to fetch population data for ${cityName}`);
    return { data: { populationCounts: [{ value: 'N/A' }] } };
  }
};

export const fetchCountryData = async (isoName) => {
  try {
    const response = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/flag/images',
      {
        iso2: isoName,
      }
    );
    return response.data;
  } catch (error) {
    console.warn('failed the fetch the countries Data');
  }
};
export const fetchCountryDial = async (isoName) => {
  try {
    const response = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/codes',
      {
        iso2: isoName,
      }
    );
    return response.data;
  } catch (error) {
    console.warn('failed the dial fetch');
  }
};
export const fetchForeCastWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_FORECAST_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw error;
  }
};
