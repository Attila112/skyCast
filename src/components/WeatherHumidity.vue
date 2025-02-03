<template>
  <div class="boxes">
    <div class="humidityHeader">
      <img :src="ICONS.humidity" alt="humidity" />
      <p>Humidity</p>
    </div>
    <div class="humidityData">
      <p>{{ formattedHumidity }}</p>
    </div>
  </div>
</template>

<script>
import { ICONS } from '@/services/constants';
export default {
  data() {
    return {
      ICONS,
    };
  },
  name: 'WeatherHumidity',
  props: {
    humidity: {
      required: true,
    },
  },
  computed: {
    formattedHumidity() {
      const data = this.humidity;
      return `${data} %`;
    },
  },
};
</script>

<style>
.humidityHeader {
  display: flex;
  flex-direction: row;
  font-size: larger;
  max-height: 2.5rem;
  margin-top: 5%;
}
.humidityHeader img {
  max-height: 100%;
}
.humidityData p {
  margin: 10%;
  font-size: xx-large;
  white-space: nowrap;
}
</style>
