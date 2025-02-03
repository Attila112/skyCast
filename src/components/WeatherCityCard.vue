<template>
  <div v-if="cityData" class="details city">
    <h2>{{ cityData.name }}</h2>
    <h2>{{ formattedDateTime(cityData.dt) }}</h2>
    <h2>{{ cityData.currentTime }}</h2>
    <div class="countryData">
      <div class="data-item">
        <img :src="ICONS.sunrise" alt="sunrise" />
        <h2>{{ formattedSunTime(cityData.sys?.sunrise) }}</h2>
        <img :src="ICONS.sunset" alt="sunset" />
        <h2>{{ formattedSunTime(cityData.sys?.sunset) }}</h2>
      </div>
      <div class="data-item">
        <h2>Day: {{ cityData.day }}</h2>
        <img :src="ICONS.calendar" alt="calendar" />
      </div>
    </div>
    <div class="countryData">
      <div class="data-item">
        <h2>Country: {{ cityData.country?.data?.name }}</h2>
        <img
          v-if="cityData.country?.data?.flag"
          :src="cityData.country.data.flag"
          alt="flag"
        />
      </div>
      <div class="data-item">
        <h2>Dial Code: {{ cityData.dial?.data?.dial_code }}</h2>
        <img :src="ICONS.phone" alt="phone" />
      </div>
      <div class="data-item">
        <h2>Population: {{ cityData.population }}</h2>
        <img :src="ICONS.person" alt="person" />
      </div>
    </div>
  </div>
</template>

<script>
import { ICONS } from '@/services/constants';

export default {
  name: 'WeatherCityCard',
  props: {
    cityData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formattedSunTime = (sunData) => {
      if (!sunData) return 'N/A';
      const sunTime = new Date((sunData + props.cityData.timezone) * 1000);
      const hours = sunTime.getUTCHours().toString().padStart(2, '0');
      const minutes = sunTime.getUTCMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };
    const formattedDateTime = (dtTime) => {
      if (!dtTime) return 'N/A';
      const date = new Date(dtTime * 1000);
      return date.toISOString().substring(0, 10);
    };

    return {
      ICONS,
      formattedSunTime,
      formattedDateTime,
    };
  },
};
</script>

<style>
.countryData {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 2% 0;
}

.data-item {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 10px;
}

.countryData h2 {
  margin: 0;
  font-size: 1.5rem;
}

.countryData img {
  width: auto;
  height: 1.5em;
  margin-right: 5px;
  margin-left: 5px;
  vertical-align: middle;
}

@media screen and (max-width: 768px) {
  .countryData {
    flex-direction: column;
    align-items: center;
  }

  .countryData h2 {
    margin-bottom: 5px;
  }

  .data-item {
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
