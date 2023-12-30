import { createApplication } from "graphql-modules";

import accountModule from "./account/module.js";
import baseModule from "./base/module.js";
import imageModule from "./image/module.js";

export default createApplication({
  modules: [accountModule, baseModule, imageModule],
});
