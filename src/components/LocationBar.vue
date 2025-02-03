<template>
  <div class="location-bar">
    <input
      v-model="localCity"
      type="text"
      placeholder="Enter city name"
      class="city-input"
    />
    <button @click="fetchWeather" class="button">Fetch Weather</button>
    <button @click="$emit('load-user-location')" class="button">
      Use My Location
    </button>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localCity: this.city,
    };
  },
  watch: {
    city(newCity) {
      this.localCity = newCity;
    },
  },
  methods: {
    fetchWeather() {
      this.$emit('update-city', this.localCity);
      this.$emit('get-weather');
    },
  },
};
</script>

<style>
.button {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #231991;
  color: white;
  border: none;
  border-radius: 5px;
}

.city-input {
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.location-bar {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 480px) {
  .location-bar {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
