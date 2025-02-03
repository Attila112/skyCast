<template>
  <div class="boxes">
    <div class="tempHeader">
      <img :src="ICONS.maxT" alt="maxMeter" />
      <p>Max</p>
    </div>
    <div class="tempData">
      <p>{{ formattedMaxTemperature }} °C</p>
    </div>
    <div class="tempHeader">
      <img :src="ICONS.minT" alt="minMeter" />
      <p>Min</p>
    </div>
    <div class="tempData">
      <p>{{ formattedMinTemperature }} °C</p>
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
  name: 'WeatherMinMax',
  props: {
    maxTemp: {
      required: true,
    },
    minTemp: {
      required: true,
    },
  },
  computed: {
    formattedMaxTemperature() {
      const data = this.maxTemp.toFixed(1);
      if (data[0] === '-') {
        return `- ${data.substring(1)}`;
      }
      return data;
    },
    formattedMinTemperature() {
      const data = this.minTemp.toFixed(1);
      if (data[0] === '-') {
        return `- ${data.substring(1)}`;
      }
      return data;
    },
  },
};
</script>

<style>
.tempHeader {
  display: flex;
  flex-direction: row;
  font-size: larger;
  max-height: 2.5rem;
  margin-top: 5%;
}
.tempHeader img {
  max-height: 100%;
}
.tempData p {
  margin: 10%;
  font-size: xx-large;
  white-space: nowrap;
}
</style>
