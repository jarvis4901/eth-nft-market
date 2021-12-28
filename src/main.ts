import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import { store } from "./store";
import "./assets/tailwind.css";
import V3waterfall from "./components/waterfall";

const head = createHead();
const app = createApp(App);

app.use(store);
app.use(router);
app.use(head);
app.use(V3waterfall);

app.mount("#app");

app.config.globalProperties.$filters = {
  shortHexAddress(s: string) {
    return `${s.substring(0, 13)}...${s.substring(37, 41)}`.toLowerCase();
  },
};
