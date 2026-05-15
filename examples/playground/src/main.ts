import { bootstrapPlayground } from "./bootstrap";
import { renderApp } from "./app";

bootstrapPlayground();

const root = document.querySelector<HTMLDivElement>("#app");

if (root) {
  root.innerHTML = renderApp();
}
