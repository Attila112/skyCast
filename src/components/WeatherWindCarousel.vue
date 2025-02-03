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
  <Carousel v-bind="config" class="details windCarousel">
    <Slide v-for="cast in forecast" :key="cast.dt">
      <div class="windBox">
        <p>{{ formattedWindUnit(cast.wind.speed) }} km/h</p>
        <img :src="getIconSrc(cast.wind.speed)" />
        <p>{{ formattedTime(cast.dt) }}</p>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { ICONS } from '@/services/constants';
export default {
  data() {
    return {
      ICONS,
    };
  },
  name: 'WeatherWindCarousel',
  props: {
    forecast: {
      require: true,
    },
    timezone: {
      require: true,
    },
  },
  methods: {
    getIconSrc(speed) {
      switch (true) {
        case speed > 0 && speed < 1.7:
          return ICONS.windGreenMin;
        case speed >= 1.7 && speed < 5.3:
          return ICONS.windGreenMedium;
        case speed >= 5.3 && speed < 10.9:
          return ICONS.windGreenMax;
        case speed >= 10.9 && speed < 16.9:
          return ICONS.windYellow;
        case speed >= 16.9:
          return ICONS.windRed;
        default:
          return 'Nothing';
      }
    },
    formattedWindUnit(speed) {
      return (speed * 3.6).toFixed(2);
    },
    formattedTime(time) {
      const newDate = new Date((time + this.timezone) * 1000);
      return `${newDate.getUTCHours().toString().padStart(2, '0')}:00`;
    },
  },
};
</script>

<style>
.windCarousel {
  flex-wrap: wrap;
  max-width: 40vw;
}
.windBox {
  display: grid;
  gap: 0;
  justify-content: center;
  align-items: center;
}
.windBox img {
  max-width: 50px;
  max-height: 50px;
}

@media screen and (max-width: 768px) {
  .windCarousel {
    max-width: 100vw;
  }
}
</style>
