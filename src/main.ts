import { createApp } from "vue";
import App from "./App.vue";
import store from "../src/store/index";
import router from "@/router";

import "@/assets/main.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
