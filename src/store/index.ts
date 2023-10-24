// store.ts
import { createStore, Store } from "vuex";
import axios from "axios";
// import { Commit } from "vuex";

interface Province {
  id: number;
  nama: string;
}

interface City {
  id: number;
  nama: string;
}

interface State {
  provinces: Province[];
  cities: City[];
  selectedProvince: string | null;
  selectedCity: string | null;
}

const store: Store<State> = createStore({
  state: {
    provinces: String,
    cities: String,
    selectedProvince: null,
    selectedCity: null,
  },

  mutations: {
    setProvinces(state: State, provinces: Province[]) {
      state.provinces = provinces;
    },
    setCities(state: State, cities: City[]) {
      state.cities = cities;
    },

    setSelectedProvince(state: State, province: Province[]) {
      state.selectedProvince = province;
    },
    setSelectedCity(state: State, city: City | null) {
      state.selectedCity = city;
    },
  },

  actions: {
    async fetchProvincesfetchProvinces({ commit }: { commit: Commit }) {
      const response = await axios
        .get(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then((provinces) => provinces.data)
        .catch((error) => console.log(error));
      console.log(response);
      // provinces = provinces.data;
      commit("setProvinces", response.data);
    },

    async fetchCities({ commit }: { commit: Commit }, provinceId: string) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/kabupaten?provinsi=${provinceId}`
      );
      commit("setCities", response.data);
    },
  },

  getters: {
    getProvinces(state: State) {
      return state.provinces;
    },
    getCities(state: State) {
      return state.cities;
    },
  },
});

export default store;
