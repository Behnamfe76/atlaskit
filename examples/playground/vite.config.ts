import { defineConfig } from "vite";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

export default defineConfig({
  resolve: {
    alias: {
      "@atlaskit/adapter-contracts": fileURLToPath(
        new URL(
          "../../packages/adapter-contracts/src/index.ts",
          import.meta.url
        )
      ),
      "@atlaskit/core": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url)
      ),
      "@atlaskit/vue": fileURLToPath(
        new URL("../../packages/vue/src/index.ts", import.meta.url)
      ),
      vue: require.resolve("vue/dist/vue.runtime.esm-bundler.js")
    }
  },
  server: {
    port: 4173
  }
});
