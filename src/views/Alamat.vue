<!-- ProvinceCitySelector.vue -->
<template>
  <div class="flex flex-row justify-center gap-3">
    <div class="text-black">
      <label for="province" class="text-white">Province:</label>
      <select id="province" v-model="selectedProvince" @change="fetchCities">
        <option disabled selected class="text-black">Select Province</option>
        <option
          class="text-black"
          v-for="province in provinces"
          :key="province.id"
          :value="province.name"
        >
          {{ province.name }}
        </option>
      </select>
    </div>
    <div class="div">
      <label for="city">City:</label>
      <select id="city" v-model="selectedCity">
        <option value="">Select City</option>
        <option v-for="city in cities" :key="city.id" :value="city.name">
          {{ city.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const provinces = computed(() => store.getters.getProvinces);
const cities = computed(() => store.getters.getCities);

const selectedProvince = ref<String>("");
const selectedCity = ref<String>("");

onMounted(() => {
  store.dispatch("fetchProvinces");
  store.dispatch("fetchCities");
  selectedProvince.value = store.getters.getProvinces;
  selectedCity.value = store.getters.getCities;
});

const fetchCities = () => {
  if (selectedProvince.value) {
    store.dispatch("fetchCities", selectedProvince.value);
  }
};
</script>
