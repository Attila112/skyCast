<template>
  <div class="details weather">
    <div class="mainData">
      <h1>{{ formattedTemperature }} °C</h1>
      <img :src="getIconSrc" />
      <p>{{ formattedDescription }}</p>
    </div>
    <div class="dataBoxes">
      <WeatherFeelsLike
        :feelsLike="weather.main.feels_like"
        :realTemp="weather.main.temp"
      />
      <WeatherMinMax
        :minTemp="weather.main.temp_min"
        :maxTemp="weather.main.temp_max"
      />
      <WeatherVisibility :visibility="weather.visibility" />
      <WeatherHumidity :humidity="weather.main.humidity" />
    </div>
  </div>
</template>

<script>
import WeatherFeelsLike from './WeatherFeelsLike.vue';
import WeatherMinMax from './WeatherMinMax.vue';
import WeatherVisibility from './WeatherVisibility.vue';
import WeatherHumidity from './WeatherHumidity.vue';

export default {
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  components: {
    WeatherFeelsLike,
    WeatherMinMax,
    WeatherVisibility,
    WeatherHumidity,
  },
  computed: {
    formattedTemperature() {
      const data = this.weather.main?.temp.toFixed(1);
      if (data[0] === '-') {
        return `- ${data.substring(1)}`;
      }
      return data;
    },
    formattedDescription() {
      const data = this.weather.weather[0].description;
      const result = data.charAt(0).toUpperCase() + data.slice(1);
      return result;
    },
    getIconSrc() {
      return `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
    },
  },
};
</script>

<style>
.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* max-width: 1; */
}

.mainData {
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: x-large;
  margin-bottom: 10%;
  text-align: center;
  max-width: fit-content;
}
.mainData h1 {
  font-size: xx-large;
}
.boxes {
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 100%;
}
.dataBoxes {
  display: grid;
  grid-template-columns: auto auto;
  gap: 5%;
  margin: 5%;
  background-color: transparent;
}
</style>
