import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    isolate: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["lib/**", "app/api/**", "components/**", "utils/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@models": path.resolve(__dirname, "models"),
      "@utils": path.resolve(__dirname, "utils"),
    },
  },
})
