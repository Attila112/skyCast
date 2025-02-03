<template>
  <Carousel v-bind="config">
    <Slide v-for="(cast, index) in forecast" :key="index">
      <div class="forecastBox">
        <p>{{ cast.main.temp }} °C</p>
        <img :src="getIconSrc(cast.weather[0].icon)" />
        <p>{{ formattedTime(cast.dt_txt) }}</p>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
export default {
  name: 'WeatherForecast',
  props: {
    forecast: {
      require: true,
    },
  },
  methods: {
    getIconSrc(name) {
      return `http://openweathermap.org/img/w/${name}.png`;
    },
    formattedTime(time) {
      const newDate = new Date(time);
      return `${newDate.getUTCHours()}:00`;
    },
  },
};
const config = {
  itemsToShow: 1,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    400: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    500: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
};
</script>
