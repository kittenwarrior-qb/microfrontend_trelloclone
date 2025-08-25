/**
 * - remotes: các app con mà container sẽ load (dùng alias@url).
 * - shared: khai báo lib chung để tránh load nhiều lần (react, react-dom).
 */

module.exports = {
  name: "container",
  exposes: {
    "./store": "./src/store/index.ts"
  },
  remotes: {
    RemoteComponents: "remoteComponents@http://localhost:3003/remoteEntry.js",
    TrelloPage: "remoteTrello@http://localhost:3004/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
  },
};
