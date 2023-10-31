// store.ts
import { createStore, Store } from "vuex";
import axios from "axios";

interface Location {
  id: number;
  name: string;
}

interface State {
  provinces: Location[];
  regencies: Location[];
  districts: Location[];
  villages: Location[];
}

const store: Store<State> = createStore({
  state: {
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
  },

  mutations: {
    setProvinces(state, dataProvinces) {
      state.provinces = dataProvinces;
    },
    setRegencies(state, regencies) {
      state.regencies = regencies;
    },
    setDistricts(state, districts) {
      state.districts = districts;
    },
    setVillages(state, villages) {
      state.villages = villages;
    },
  },

  actions: {
    async fetchProvinces({ commit }: any) {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      commit("setProvinces", response.data);
    },
    async fetchRegencies({ commit }: any, provinceId) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      commit("setRegencies", response.data);
    },
    async fetchDistricts({ commit }, regencyId) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
      );
      commit("setDistricts", response.data);
    },
    async fetchVillages({ commit }, districtId) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
      );
      commit("setVillages", response.data);
    },
  },

  getters: {
    getProvinces(state) {
      return state.provinces;
    },
    getRegencies(state) {
      return state.regencies;
    },
    getDistricts(state) {
      return state.districts;
    },
    getVillages(state) {
      return state.villages;
    },
  },
});

export default store;
