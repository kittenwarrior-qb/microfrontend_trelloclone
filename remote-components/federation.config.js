module.exports = {
  name: "remoteComponents",
  filename: "remoteEntry.js",
  exposes: {
    "./Card": "./src/components/Card.tsx",
  },
  shared: {
  react: { singleton: true, requiredVersion: '^19.1.1' },
  'react-dom': { singleton: true, requiredVersion: '^19.1.1' },
      'react-router-dom': { singleton: true, requiredVersion: '^7.8.2' },
    antd: { singleton: true },
  },
};
