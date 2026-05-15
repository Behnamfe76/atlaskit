import { bootstrapPlayground } from "./bootstrap";
import { renderApp } from "./app";
import { createApp } from "vue";

bootstrapPlayground();

const root = document.querySelector<HTMLDivElement>("#app");

if (root) {
  createApp({
    render: renderApp
  }).mount(root);
}
