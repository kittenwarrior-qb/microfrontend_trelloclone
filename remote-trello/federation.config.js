module.exports = {
  name: "remoteTrello",
  filename: "remoteEntry.js",
  exposes: {
    "./TrelloPage": "./src/pages/TrelloPage.tsx",
  },
  remotes: {
    TrelloPage: "remoteTrello@http://localhost:3004/remoteEntry.js",
    container: "container@http://localhost:3000/remoteEntry.js"
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
  },
};
