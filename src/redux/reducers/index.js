import { combineReducers } from 'redux';
import { AuthRegisterReducer } from './auth';

export default combineReducers({
    authRegister: AuthRegisterReducer 
});