module.exports = {
  name: "remoteTrello",
  filename: "remoteEntry.js",
  exposes: {
    "./TrelloPage": "./src/pages/TrelloPage.tsx",
  },
  remotes: {
    container: "container@http://localhost:3000/remoteEntry.js"
  },
  shared: {
  react: { singleton: true, requiredVersion: '^19.1.1' },
  'react-dom': { singleton: true, requiredVersion: '^19.1.1' },
  'react-router-dom': { singleton: true, requiredVersion: '^7.8.2' },
  
  },
};
