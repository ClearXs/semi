import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "lib/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "lib/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        noEmitOnError: true,
        noEmit: true,
      }),
      filesize(),
      json(),
      // 支持 scss，并添加前缀
      postcss({
        plugins: [autoprefixer()],
      }),
    ],
    external: ["react", "react-dom"],
  },
];
