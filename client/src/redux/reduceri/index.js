import { combineReducers } from "redux";

import { authentication } from "./auth.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { IsAdmin } from "./isAdmin.reducer";

const rootReducer = combineReducers({
  authentication,
  users,
  registration,
  IsAdmin,
});

export default rootReducer;
