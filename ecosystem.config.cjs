/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: "soclif-backend-server",
      script: "npm run start:stag",
      env: {
        NODE_ENV: "staging",
      },
    },
  ],
};
