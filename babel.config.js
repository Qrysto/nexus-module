const development = process.env.NODE_ENV !== "production";

module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      { development, runtime: "automatic", importSource: "./react" },
    ],
  ],
};
