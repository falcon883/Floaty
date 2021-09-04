import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bulma/css/bulma.min.css";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import "./assets/css/style.css";

createApp(App).use(router).mount("#app");
