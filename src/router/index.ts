import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Alamat from "../views/Alamat.vue";
// import Todo from "../components/Todo.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/alamat",
    name: "Alamat",
    component: Alamat,
  },
  // {
  //   path: "/todo",
  //   name: "Todo",
  //   component: Todo,
  // },

  // { path: "/:path(.*)", component: NotFound },
  ,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
