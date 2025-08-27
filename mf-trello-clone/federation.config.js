module.exports = {
  name: "container",
  exposes: {
    "./store": "./src/store/index.ts",
  },
  remotes: {
    RemoteComponents: "remoteComponents@http://localhost:3003/remoteEntry.js",
    TrelloPage: "remoteTrello@http://localhost:3004/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.1.1' },
    'react-dom': { singleton: true, requiredVersion: '^19.1.1' },
    'react-router-dom': { singleton: true, requiredVersion: '^7.8.2' }
  }

};
