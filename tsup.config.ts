import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/geezify.ts"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  minify: true,
});
