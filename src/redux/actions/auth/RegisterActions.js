import { REGISTER_CHANGE_FORM } from '../../types';

export const registerChangeForm = (prop, value) => {
  return {
    type: REGISTER_CHANGE_FORM,
    payload: { prop, value }
  }
};