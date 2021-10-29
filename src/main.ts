// register vue composition api globally
// import { ViteSSG } from 'vite-ssg'
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import Amplify from "aws-amplify";
import App from "./App.vue";
import awsconfig from "./aws-exports";

import "../node_modules/normalize.css/normalize.css";
import "../node_modules/the-new-css-reset/css/reset.css";
// your custom styles here
import "./styles/main.css";
Amplify.configure(awsconfig);

const app = createApp(App);

// setup up pages with layouts
const routes = setupLayouts(generatedRoutes);
const router = createRouter({ history: createWebHistory(), routes });

app.use(router);

// install all modules under `modules/`
Object.values(import.meta.globEager("./modules/*.ts")).map((i) =>
  i.install?.({ app, router, routes })
);

app.mount("#app");
