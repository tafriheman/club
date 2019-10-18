import {
  AUTH_LOGIN_VERIFY_CHANGE_PROP,
  AUTH_LOGIN_VERIFY_ERROR,
  AUTH_LOGIN_VERIFY_RESET,
  COMPLETE_INFO,
  COMPLETE_INFO_ERROR
} from "../../types";
import axios from "axios";
import config from "../../../config.json";
import { appFetchUser } from "../app";

export const authLoginVerifyChangeProp = (prop, value) => {
  return {
    type: AUTH_LOGIN_VERIFY_CHANGE_PROP,
    payload: { prop, value }
  };
};


export const completeUserInfo = (prop, value) => {
  return {
    type: COMPLETE_INFO,
    payload: { prop, value }
  };
};

export const authLoginVerifySendVerificationCode = (phone, history) => {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN_VERIFY_ERROR,
      payload: ""
    });
    axios
      .post(`${config.domain}/club/login`, { phone })
      .then(response => {
        history.push("/verify");
      })
      .catch(e =>
        dispatch({
          type: AUTH_LOGIN_VERIFY_ERROR,
          payload: e.response.data.message
        })
      );
  };
};


export const authLoginVerifySendVerificationCodeNew = (phone, history) => {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN_VERIFY_ERROR,
      payload: ""
    });
    axios
      .post(`${config.domain}/club/login`, { phone })
      .then(response => {
        history.push("/newLoginConfirm");
      })
      .catch(e =>
        dispatch({
          type: AUTH_LOGIN_VERIFY_ERROR,
          payload: e.response.data.message
        })
      );
  };
};

export const authLoginVerifyVerifyCode = (phone, code, history) => {

  return dispatch => {
    dispatch({
      type: AUTH_LOGIN_VERIFY_ERROR,
      payload: ""
    });
    axios
      .post(`${config.domain}/club/verify`, { phone, code })
      .then(response => {
        localStorage.setItem(config.USER_KEY, JSON.stringify(response.data));
        dispatch(appFetchUser());
        dispatch({
          type: AUTH_LOGIN_VERIFY_RESET
        });
        history.push("/dashboard/product/list");
      })
      .catch(e =>
        dispatch({
          type: AUTH_LOGIN_VERIFY_ERROR,
          payload: e.response.data.message
        })
      );
  };
};

export const authLoginVerifyVerifyCodeNew = (phone, code, history) => {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN_VERIFY_ERROR,
      payload: ""
    });
    axios
      .post(`${config.domain}/club/verify`, { phone, code })
      .then(response => {
        console.log(response.data.user);
        localStorage.setItem(config.USER_KEY, JSON.stringify(response.data));
        localStorage.setItem('user_token',response.data.token);
        dispatch(appFetchUser());
        if (response.data.user.full_name.length === 0 && response.data.user.marital_status.length === 0 &&
          response.data.user.gender.length === 0 && response.data.user.birth_date.length === 0
        ) {
          history.push("/newLoginRegister");
          dispatch(completeUserInfo('user_id', response.data.user._id))
        }
        else {
          console.log('+++++++++++++++++++')
          history.push("/inviteFriends");

        }
        // dispatch({
        //   type: AUTH_LOGIN_VERIFY_RESET
        // });
      })
      .catch(e =>
        dispatch({
          type: AUTH_LOGIN_VERIFY_ERROR,
          payload: e.response.data.message
        })
      );
  };
};
