import { combineReducers } from 'redux';
import { RegisterReducer } from './auth';

export default combineReducers({
    auth: {
        register: RegisterReducer
    }
});