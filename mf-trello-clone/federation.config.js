/**
 * - remotes: các app con mà container sẽ load (dùng alias@url).
 * - shared: khai báo lib chung để tránh load nhiều lần (react, react-dom).
 */

module.exports = {
  name: "container",
  remotes: {
    vueApp: "vueApp@http://localhost:3001/remoteEntry.js",
    reactApp: "reactApp@http://localhost:3002/remoteEntry.js",
    trelloApp: "trelloApp@http://localhost:3003/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  },
};
