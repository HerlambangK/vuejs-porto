<template>
  <div class="">
    <h1>Provinsi</h1>
    <select
      class="text-black"
      v-model="selectedProvince"
      @change="fetchRegencies"
    >
      <option value="">Pilih Provinsi</option>
      <option
        v-for="province in provinces"
        :key="province.id"
        :value="province.id"
      >
        {{ province.name }}
      </option>
    </select>

    <h1>Kabupaten/Kota</h1>
    <select
      class="text-black"
      v-model="selectedRegency"
      @change="fetchDistricts"
    >
      <option value="">Pilih Kabupaten/Kota</option>
      <option
        v-for="regency in regencies"
        :key="regency.id"
        :value="regency.id"
      >
        {{ regency.name }}
      </option>
    </select>

    <h1>Kecamatan</h1>
    <select
      class="text-black"
      v-model="selectedDistrict"
      @change="fetchVillages"
    >
      <option value="">Pilih Kecamatan</option>
      <option
        v-for="district in districts"
        :key="district.id"
        :value="district.id"
      >
        {{ district.name }}
      </option>
    </select>

    <h1>Desa/Kelurahan</h1>
    <select class="text-black" v-model="selectedVillage">
      <option value="">Pilih Desa/Kelurahan</option>
      <option v-for="village in villages" :key="village.id" :value="village.id">
        {{ village.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);
const villages = ref([]);
const selectedProvince = ref("");
const selectedRegency = ref("");
const selectedDistrict = ref("");
const selectedVillage = ref("");

const fetchProvinces = () => {
  store.dispatch("fetchProvinces");
};

const fetchRegencies = () => {
  if (selectedProvince.value) {
    store.dispatch("fetchRegencies", selectedProvince.value);
  }
};

const fetchDistricts = () => {
  if (selectedRegency.value) {
    store.dispatch("fetchDistricts", selectedRegency.value);
  }
};

const fetchVillages = () => {
  if (selectedDistrict.value) {
    store.dispatch("fetchVillages", selectedDistrict.value);
  }
};
// Gunakan watch untuk memuat data ketika nilai berubah
watch(selectedProvince, (newProvince: any) => {
  if (newProvince) {
    fetchRegencies();
  }
});

watch(selectedRegency, (newRegency: any) => {
  if (newRegency) {
    fetchDistricts();
  }
});

watch(selectedDistrict, (newDistrict: any) => {
  if (newDistrict) {
    fetchVillages();
  }
});

onMounted(() => {
  fetchProvinces();
});

onMounted(() => {
  fetchProvinces();
  provinces.value = store.getters.getProvinces;
  regencies.value = store.getters.getRegencies;
  districts.value = store.getters.getDistricts;
  villages.value = store.getters.getVillages;
});

// Mengamati perubahan pada variabel terkait
// watchEffect(() => {
//   if (selectedProvince.value) {
//     fetchRegencies();
//   }
//   if (selectedRegency.value) {
//     fetchDistricts();
//   }
//   if (selectedDistrict.value) {
//     fetchVillages();
//   }
// });
</script>
