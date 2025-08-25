module.exports = {
  name: "remoteComponents",
  filename: "remoteEntry.js",
  exposes: {
    "./MyHeader": "./src/components/Header.tsx",
    "./Button": "./src/components/Button.tsx",
    "./Card": "./src/components/Card.tsx",
  },
  shared: {
    react: { singleton: true, eager:false, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, eager:false,requiredVersion: "^19.0.0" },
    antd: { singleton: true },
  },
};
