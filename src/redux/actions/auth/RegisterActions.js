import { AUTH_REGISTER_CHANGE_FORM } from '../../types';

export const authRegisterChangeForm = (prop, value) => {
  return {
    type: AUTH_REGISTER_CHANGE_FORM,
    payload: { prop, value }
  }
};