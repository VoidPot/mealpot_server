import { createApplication } from "graphql-modules";

import authModule from "./auth/module.js";
import baseModule from "./base/module.js";
import imageModule from "./image/module.js";
import profileModule from "./profile/module.js";
import userModule from "./user/module.js";
import userProfileModule from "./user-profile/module.js";

export default createApplication({
  modules: [
    baseModule,
    authModule,
    imageModule,
    profileModule,
    userModule,
    userProfileModule,
  ],
});
