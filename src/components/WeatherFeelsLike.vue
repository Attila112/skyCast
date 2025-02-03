<template>
  <div class="boxes">
    <div class="feelsHeader">
      <img :src="ICONS.feels" alt="feels" />
      <p>Feels Like</p>
    </div>
    <div class="feelsData">
      <p>{{ formattedTemperature }} °C</p>
    </div>
    <p>{{ whichText }}</p>
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
  name: 'WeatherFeelsLike',
  props: {
    feelsLike: {
      required: true,
    },
    realTemp: {
      required: true,
    },
  },
  computed: {
    formattedTemperature() {
      const data = this.feelsLike.toFixed(1);
      if (data[0] === '-') {
        return `- ${data.substring(1)}`;
      }
      return data;
    },
    whichText() {
      const warmer = 'It feels you a little warmer';
      const colder = 'It feels you a little colder';
      const same = 'You feel the same temperature';
      if (this.feelsLike > this.realTemp) {
        return warmer;
      } else if (this.feelsLike < this.realTemp) {
        return colder;
      } else {
        return same;
      }
    },
  },
};
</script>

<style>
.feelsHeader {
  display: flex;
  flex-direction: row;
  font-size: larger;
  max-height: 2.5rem;
  margin-top: 5%;
}
.feelsHeader img {
  max-height: 100%;
}
.feelsData p {
  margin: 10%;
  font-size: xx-large;
  white-space: nowrap;
}
</style>
