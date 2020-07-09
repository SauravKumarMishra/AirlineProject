import { combineReducers } from 'redux';
import staffReducer from './staffReducer';

const rootReducers = combineReducers({
  staffReducer: staffReducer
});

export default rootReducers;
