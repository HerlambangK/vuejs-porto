<!-- ProvinceCitySelector.vue -->
<template>
  <div>
    <label for="province">Province:</label>
    <select id="province" v-model="selectedProvince" @change="fetchCities">
      <option value="">Select Province</option>
      <option
        v-for="province in provinces"
        :key="province.id"
        :value="province.nama"
      >
        {{ province.nama }}
      </option>
    </select>

    <label for="city">City:</label>
    <select id="city" v-model="selectedCity">
      <option value="">Select City</option>
      <option v-for="city in cities" :key="city.id" :value="city.nama">
        {{ city.nama }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const provinces = computed(() => store.getters.getProvinces);
const cities = computed(() => store.getters.getCities);

const selectedProvince = ref<string | null>("");
const selectedCity = ref<string | null>("");

const fetchCities = () => {
  if (selectedProvince.value) {
    store.dispatch("fetchCities", selectedProvince.value);
  }
};
</script>
