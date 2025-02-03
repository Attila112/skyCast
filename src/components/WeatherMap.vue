<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import { ref, shallowRef, onMounted, watch, nextTick, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    mapData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const mapRef = shallowRef(null);
    const mapContainer = ref(null);

    const initMap = async () => {
      try {
        if (mapRef.value) return;
        await nextTick();
        if (mapContainer.value && props.mapData) {
          const { lat, lon, temp } = props.mapData;
          mapRef.value = L.map(mapContainer.value).setView([lat, lon], 15);

          const osm = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution: '© OpenStreetMap contributors',
            }
          );

          const StadiaAlidadeSatellite = L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}',
            {
              minZoom: 0,
              maxZoom: 20,
              attribution:
                '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              ext: 'jpg',
            }
          ).addTo(mapRef.value);

          L.marker([lat, lon])
            .addTo(mapRef.value)
            .bindPopup(`Your location temperature.<br> ${temp} °C`)
            .openPopup();

          const baseMaps = {
            'Stadia Satelite': StadiaAlidadeSatellite,
            'Open Street Map': osm,
          };

          L.control.layers(baseMaps).addTo(mapRef.value);
        }
      } catch (error) {
        console.error('Error initialiying map:', error);
      }
    };

    const updateMap = () => {
      if (mapRef.value && props.mapData) {
        const { lat, lon, temp } = props.mapData;
        mapRef.value.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapRef.value.removeLayer(layer);
          }
        });
        mapRef.value.setView([lat, lon]);
        L.marker([lat, lon])
          .addTo(mapRef.value)
          .bindPopup(`Your location temperature.<br> ${temp} °C`)
          .openPopup();
      }
    };

    watch(
      () => props.mapData,
      async () => {
        if (!mapRef.value) {
          await initMap();
        } else {
          updateMap();
        }
      },
      { deep: true }
    );

    const handleResize = () => {
      if (mapRef.value && mapRef.value.invalidateSize) {
        mapRef.value.invalidateSize();
      }
    };
    onMounted(async () => {
      await initMap();
      setTimeout(() => {
        if (mapRef.value) {
          mapRef.value.invalidateSize();
        }
      }, 100);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      if (mapRef.value) {
        mapRef.value.remove();
      }
    });

    return {
      mapRef,
      mapContainer,
      initMap,
      updateMap,
    };
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 70vh;
  position: relative;
  z-index: 1;
  margin-top: 5%;
}

:deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}

:deep(.leaflet-pane) {
  z-index: 1;
}

.map-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  font-size: 1.2em;
  color: #666;
}

@media screen and (max-width: 768px) {
  .map-container {
    height: 40vh;
  }
}

@media screen and (max-width: 480px) {
  .map-container {
    height: 30vh;
  }
}
</style>
