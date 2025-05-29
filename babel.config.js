module.exports = {
  presets: ['module:metro-react-native-babel-preset', "nativewind/babel"],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: false }],
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
    'react-native-reanimated/plugin', // Mantenha sempre por último, como recomendado
  ],
};
