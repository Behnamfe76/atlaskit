import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@atlaskit/adapter-contracts": fileURLToPath(
        new URL("../adapter-contracts/src/index.ts", import.meta.url)
      )
    }
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"]
  }
});
