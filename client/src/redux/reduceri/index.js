import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';


const rootReducer = combineReducers({
  
    authentication,
    users,
    registration,
   
 
});

export default rootReducer;