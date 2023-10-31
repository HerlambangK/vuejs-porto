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
import { ref, onMounted, onBeforeMount, watchEffect, watch } from "vue";
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

const fetchRegencies = async () => {
  if (selectedProvince.value) {
    await store.dispatch("fetchRegencies", selectedProvince.value);
    regencies.value = store.getters.getRegencies;
  }
};

const fetchDistricts = async () => {
  if (selectedRegency.value) {
    await store.dispatch("fetchDistricts", selectedRegency.value);
    districts.value = store.getters.getDistricts;
  }
};

const fetchVillages = async () => {
  if (selectedDistrict.value) {
    await store.dispatch("fetchVillages", selectedDistrict.value);
    villages.value = store.getters.getVillages;
  }
};
// Gunakan watch untuk memuat data ketika nilai berubah
// watch(selectedProvince, (newProvince: any) => {
//   if (newProvince) {
//     fetchRegencies();
//   }
// });

// watch(selectedRegency, (newRegency: any) => {
//   if (newRegency) {
//     fetchDistricts();
//   }
// });

// watch(selectedDistrict, (newDistrict: any) => {
//   if (newDistrict) {
//     fetchVillages();
//   }
// });

onMounted(async () => {
  await store.dispatch("fetchProvinces");
  provinces.value = store.getters.getProvinces;
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
