import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "vue-loading-overlay/dist/css/index.css";
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vue3Toastify);

localStorage.removeItem("token");
localStorage.removeItem("user");

app.mount("#app");
