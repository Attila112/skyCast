<template>
  <div class="vue" :class="backgroundImageClass">
    <div class="weather-app">
      <LocationBar
        :city="city"
        @update-city="city = $event"
        @get-weather="getWeather"
        @load-user-location="loadUserLocation"
      />
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="isLoading">Loading...</div>
      <div class="weatherBoxes">
        <WeatherCityCard v-if="cityData" :cityData="cityData" />
        <div class="weatherData">
          <WeatherCard v-if="weather" :weather="weather" />
          <div class="forecastData">
            <WeatherCarousel :forecast="forecast" :timezone="timezone" />
            <WeatherWindCarousel :forecast="forecast" :timezone="timezone" />
            <WeatherMap v-if="mapData" :mapData="mapData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import {
  fetchWeatherData,
  fetchWeatherDataByCoordinates,
  fetchTimeFromCoordinates,
  fetchCityData,
  fetchCountryData,
  fetchCountryDial,
  fetchForeCastWeatherByCoordinates,
} from './services/weatherService';
import WeatherCard from './components/WeatherCard.vue';
import WeatherCityCard from './components/WeatherCityCard.vue';
import WeatherCarousel from './components/WeatherCarousel.vue';
import WeatherMap from './components/WeatherMap.vue';
import LocationBar from './components/LocationBar.vue';
import WeatherWindCarousel from './components/WeatherWindCarousel.vue';

export default {
  components: {
    WeatherCard,
    WeatherCityCard,
    WeatherCarousel,
    WeatherMap,
    LocationBar,
    WeatherWindCarousel,
  },
  setup() {
    const city = ref('');
    const weather = ref(null);
    const timeApi = ref(null);
    const timer = ref(null);
    const forecast = ref(null);
    const timezone = ref(0);
    const coordinates = ref(null);
    const isLoading = ref(true);
    const error = ref(null);

    const cityData = computed(() => {
      if (!weather.value) return null;
      return {
        ...weather.value,
        population: weather.value.population
          ? weather.value.population
          : 'No Info',
        currentTime: new Date(timeApi.value).toLocaleTimeString(),
        date: timeApi.value ? timeApi.value.toISOString().substring(0, 10) : '',
        day: weather.value.day,
      };
    });

    const mapData = computed(() => {
      if (!coordinates.value || !weather.value) return null;
      return {
        lat: coordinates.value.lat,
        lon: coordinates.value.lon,
        temp: weather.value.main?.temp.toFixed(1),
      };
    });

    const backgroundImageClass = computed(() => {
      if (!weather.value || !timeApi.value) return 'night-bg';
      const hour = timeApi.value.getHours();
      const { sunrise, sunset } = weather.value.sys;
      const sunriseHour = new Date(
        (sunrise + timezone.value) * 1000
      ).getUTCHours();
      const sunsetHour = new Date(
        (sunset + timezone.value) * 1000
      ).getUTCHours();
      const averageSunHour = (sunsetHour - sunriseHour) / 3;

      if (hour >= sunriseHour && hour < sunriseHour + averageSunHour)
        return 'morning-bg';
      if (
        hour >= sunriseHour + averageSunHour &&
        hour < sunsetHour - averageSunHour
      )
        return 'day-bg';
      if (hour >= sunsetHour - averageSunHour && hour < sunsetHour)
        return 'sunset-bg';
      return 'night-bg';
    });

    const startClock = () => {
      if (timer.value) clearInterval(timer.value);
      updateClock();
      timer.value = setInterval(updateClock, 1000);
    };

    const updateClock = () => {
      timeApi.value = new Date(
        timeApi.value.setSeconds(timeApi.value.getSeconds() + 1)
      );
    };

    const loadUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            coordinates.value = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            await fetchWeatherInfo();
          },
          (error) => {
            console.error('Geolocation error:', error);
            this.error = 'Could not fetch your location.';
          }
        );
      } else {
        this.error = 'Geolocation is not supported by this browser.';
      }
    };

    const getWeather = async () => {
      try {
        isLoading.value = true;
        error.value = null;
        weather.value = await fetchWeatherData(city.value);
        coordinates.value = {
          lat: weather.value.coord.lat,
          lon: weather.value.coord.lon,
        };
        await fetchWeatherInfo();
      } catch (err) {
        console.error('Error fetching weather data:', err);
        if (err.message === 'City not found') {
          error.value =
            'City not found. Please check the spelling and try again.';
        } else {
          error.value =
            'An error occurred while fetching weather data. Please try again later.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    const fetchWeatherInfo = async () => {
      try {
        isLoading.value = true;
        error.value = null;
        const { lat, lon } = coordinates.value;
        weather.value = await fetchWeatherDataByCoordinates(lat, lon);
        timezone.value = weather.value.timezone;

        const foreCastData = await fetchForeCastWeatherByCoordinates(lat, lon);
        forecast.value = foreCastData.list;

        const fetchTime = await fetchTimeFromCoordinates(lat, lon);
        weather.value.day = fetchTime.dayOfWeek;
        timeApi.value = new Date(fetchTime.dateTime);
        startClock();

        weather.value.country = await fetchCountryData(
          weather.value.sys.country
        );
        weather.value.dial = await fetchCountryDial(weather.value.sys.country);

        const fetchPopulation = await fetchCityData(weather.value.name);
        weather.value.population =
          fetchPopulation.data?.populationCounts[0]?.value || 'No Info';
      } catch (error) {
        console.error('Error fetching weather info:', error);
        error.value = 'Error fetching weather information. Please try again.';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      loadUserLocation();
    });

    onBeforeUnmount(() => {
      if (timer.value) clearInterval(timer.value);
    });

    return {
      city,
      weather,
      forecast,
      timezone,
      coordinates,
      cityData,
      mapData,
      backgroundImageClass,
      isLoading,
      error,
      getWeather,
      loadUserLocation,
    };
  },
};
</script>

<style>
.vue {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  transition: background-image 0.5s ease;
  color: black;
  background-color: transparent;
  z-index: 0;
}

.morning-bg {
  background-image: url('@/assets/morning.jpg');
}

.morning-bg .details {
  background-color: rgba(209, 195, 92, 0.4);
}

.morning-bg .boxes {
  background-color: rgba(0, 0, 0, 0.4);
  color: rgb(242, 241, 241);
}

.day-bg {
  background-image: url('@/assets/day.jpeg');
  color: white;
}

.day-bg .boxes {
  background-color: rgba(255, 255, 255, 0.4);
  color: black;
}

.day-bg .details {
  background-color: rgba(0, 0, 0, 0.4);
}

.sunset-bg {
  background-image: url('@/assets/sunset.jpeg');
}

.sunset-bg .boxes {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}

.sunset-bg .details {
  background-color: rgba(222, 220, 90, 0.4);
}

.night-bg {
  background-image: url('@/assets/night.jpg');
  color: black;
}

.night-bg .boxes {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}

.weather-app {
  text-align: center;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.details {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 8px;
}

.weatherData {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.weatherBoxes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.error-message {
  color: red;
  background-color: #ffeeee;
  border: 1px solid red;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  .weatherData {
    flex-direction: column;
    margin: 5%;
  }

  .city {
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media screen and (max-width: 480px) {
  .weather-app {
    width: 100%;
  }

  .weatherData {
    flex-direction: column;
    margin: 5%;
  }

  .city {
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>
