/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: "mealpot-backend-server",
      script: "npm run start:stag",
      env: {
        NODE_ENV: "staging",
      },
    },
  ],
};
