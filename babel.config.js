module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "expo-font",
        {
          "fonts": ["node_modules/@expo-google-fonts/poppins/Poppins_400Regular.ttf"],
        }
      ]
    ]
  };
};
