import App from "./App.vue";
import { createApp } from "vue";

const app = createApp(App);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.mount("#app");
