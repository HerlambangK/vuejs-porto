import { createStore, Store, Commit } from "vuex";
import axios from "axios";

interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface State {
  provinces: Province[];
  cities: City[];
  selectedProvince: string | null;
  selectedCity: string | null;
}

const store: Store<State> = createStore({
  state: {
    provinces: [],
    cities: [],
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

    setSelectedProvince(state: State, province: string | null) {
      state.selectedProvince = province;
    },
    setSelectedCity(state: State, city: string | null) {
      state.selectedCity = city;
    },
  },

  actions: {
    async fetchProvinces({ commit }: { commit: Commit }) {
      try {
        const response = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        const provinces = response.data;
        commit("setProvinces", provinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    },

    async fetchCities({ commit }: { commit: Commit }, provinceId: string) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
        );
        commit("setCities", response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
  },

  getters: {
    getProvinces(state: State): Province[] {
      return state.provinces;
    },
    getCities(state: State) {
      return state.cities;
    },
  },
});

export default store;
