<template>
  <div>
    <h1>Weather Details</h1>
    <WeatherCard />
    <router-link to="/weather">Go Back</router-link>
  </div>
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue';

export default {
  components: { WeatherCard },
};
</script>
