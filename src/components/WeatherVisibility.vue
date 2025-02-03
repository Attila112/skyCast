<template>
  <div class="boxes">
    <div class="visibilityHeader">
      <img :src="ICONS.visibility" alt="visibility" />
      <p>Visibility</p>
    </div>
    <div class="visibilityData">
      <p>{{ formattedVisibility }}</p>
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
  name: 'WeatherVisibility',
  props: {
    visibility: {
      required: true,
    },
  },
  computed: {
    formattedVisibility() {
      const data = this.visibility / 1000;
      return `${data} km`;
    },
  },
};
</script>

<style>
.visibilityHeader {
  display: flex;
  flex-direction: row;
  font-size: larger;
  max-height: 2.5rem;
  margin-top: 5%;
}
.visibilityHeader img {
  max-height: 100%;
}
.visibilityData p {
  margin: 10%;
  font-size: xx-large;
  white-space: nowrap;
}
</style>
