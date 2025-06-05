const development = process.env.NODE_ENV !== "production";

export default {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      { development, runtime: "automatic", importSource: "./react" },
    ],
  ],
};
