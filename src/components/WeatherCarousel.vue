<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const config = {
  snapAlign: 'center',
  itemsToShow: 4,
  gap: 0,
};
</script>

<template>
  <Carousel v-bind="config" class="details carouselBox">
    <Slide v-for="cast in forecast" :key="cast.dt">
      <div class="dataBox">
        <p>{{ cast.main.temp }} °C</p>
        <img :src="getIconSrc(cast.weather[0].icon)" />
        <p>{{ formattedTime(cast.dt) }}</p>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
export default {
  name: 'WeatherForecast',
  props: {
    forecast: {
      require: true,
    },
    timezone: {
      require: true,
    },
  },
  methods: {
    getIconSrc(name) {
      return `http://openweathermap.org/img/w/${name}.png`;
    },
    formattedTime(time) {
      const newDate = new Date((time + this.timezone) * 1000);
      return `${newDate.getUTCHours().toString().padStart(2, '0')}:00`;
    },
  },
};
</script>

<style>
.dataBox {
  display: grid;
  gap: 0;
}
.carouselBox {
  flex-wrap: wrap;
  max-width: 40vw;
}
@media screen and (max-width: 768px) {
  .carouselBox {
    max-width: 100vw;
  }
}
</style>
