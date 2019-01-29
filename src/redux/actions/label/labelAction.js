import ActionType from "../../types/label";
import axios from "axios";
import config from "../../../config.json";
let clubId2 = "5c4be772bc4e291a503cbbaf";
let token2 =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InZlcmlmeSI6eyJjb2RlIjoiMCIsInRpbWUiOjB9LCJmdWxsX25hbWUiOiIiLCJyb2xlIjoiY2x1YiIsIm5vdGlmaWNhdGlvbl9pZHMiOltdLCJfaWQiOiI1YzRiZTc3MmJjNGUyOTFhNTAzY2JiYWUiLCJyZWdpc3Rlcl90aW1lIjoxNTQ4NDc4MzIyLCJwaG9uZSI6IjA5MzYwNDAzNTMzIiwibWVtYmVyc2hpcCI6W10sIl9fdiI6MH0sImNsdWIiOnsibG9jYXRpb24iOnsibGF0IjoyOS41OTE4LCJsbmciOjI5LjU5MTh9LCJpbWFnZXMiOlsicHVibGljL3VwbG9hZHMvNHJnU1ZjZWdtci5wbmciXSwiX2lkIjoiNWM0YmU3NzJiYzRlMjkxYTUwM2NiYmFmIiwibmFtZSI6Im5ldyBjbHViIiwib3duZXIiOiI1YzRiZTc3MmJjNGUyOTFhNTAzY2JiYWUiLCJ1cmwiOiJodHRwOi8vY2x1Yi5jb20iLCJsb2dvIjoicHVibGljL3VwbG9hZHMvUkQ4ZjhIZTVXLnBuZyIsImFkZHJlc3MiOiJnaGFzcm8gZGFzaHQiLCJvcHRpb25zIjp7InNob3dfcGx1Z2luX3ByaWNlIjp0cnVlfSwiYWRtaW5zIjpbXSwicGx1Z2lucyI6W3siaGlzdG9yeSI6W10sIl9pZCI6IjViZGMyYzI1NGY5MjgwMWE1NDZiNWY2OCIsInBsdWdpbiI6eyJkZXBlbmRlbmNpZXMiOltdLCJwZXJtaXNzaW9ucyI6WyJjbHViX3NlZV9wcm9kdWN0IiwiY2x1Yl9hZGRfcHJvZHVjdCIsImNsdWJfZWRpdF9wcm9kdWN0IiwiY2x1Yl9hZGRfY2F0ZWdvcnkiLCJjbHViX3NlZV9jYXRlZ29yeSIsImNsdWJfZWRpdF9jYXRlZ29yeSIsImNsdWJfYWRkX2xhYmVsIiwiY2x1Yl9lZGl0X2xhYmVsIiwiY2x1Yl9kZWxldGVfbGFiZWwiLCJjbHViX3NlZV9sYWJlbCIsImNsdWJfYWRkX2NoZWNrTGlzdCIsImNsdWJfZWRpdF9jaGVja0xpc3QiLCJjbHViX3NlZV9jaGVja0xpc3QiLCJjbHViX2RlbGV0ZV9jaGVja0xpc3QiXSwiX2lkIjoiNWJlZWM4NDIyZTM2ZjYxYjI4MjY3ZjVhIiwibmFtZSI6ItmF2K_bjNix24zYqiDZhdit2LXZiNmE2KfYqiIsInByaWNlIjoxMjAwMCwiaW1hZ2UiOiJwdWJsaWMvdXBsb2Fkcy9wbHVnaW4ucG5nIiwiX192IjowLCJyZWFkeV90b19idXkiOmZhbHNlfSwiZXhwaXJlX2RhdGUiOiIxMzk4LzA4LzAxIn1dLCJfX3YiOjB9fQ.xbF7_TcbVJV5K496sCGPAa49c2dMgh_U940OoAlVR2Y";
export const getLabel = (clubId, token) => {
  return dispatch => {
    dispatch({
      type: ActionType.LABEL_LOADING
    });
    axios
      .get(`${config.domain}/club/${clubId2}/label/all?pagenum=1&pagesize=40`, {
        headers: {
          Authorization: "Bearer " + token2
        }
      })
      .then(response => {
        dispatch({
          type: ActionType.LABEL_LIST,
          payload: response.data
        });
        dispatch({
          type: ActionType.LABEL_DONE
        });
      })
      .catch(err => console.log(err));
  };
};

export const labelAdd = (form, clubId, token, callback) => {
  return dispatch => {
    dispatch({
      type: ActionType.LABEL_LOADING
    });
    axios
      .post(`${config.domain}/club/${clubId2}/label`, form, {
        headers: {
          Authorization: "Bearer " + token2
        }
      })
      .then(response => {
        dispatch({
          type: ActionType.LABEL_ADD
        });
        dispatch({
          type: ActionType.LABEL_DONE
        });
        callback();
      })
      .catch(err => console.log(err));
  };
};
export const labelEdit = (form, clubId, token, labelId, callback) => {
  return dispatch => {
    dispatch({
      type: ActionType.LABEL_LOADING
    });
    axios
      .patch(`${config.domain}/club/${clubId2}/label/${labelId}`, form, {
        headers: {
          Authorization: "Bearer " + token2
        }
      })
      .then(response => {
        dispatch({
          type: ActionType.LABEL_EDIT
        });
        dispatch({
          type: ActionType.LABEL_DONE
        });
        callback();
      })
      .catch(err => console.log(err));
  };
};
export const labelDelete = (labelId, clubId, token, callback) => {
  return dispatch => {
    axios
      .delete(`${config.domain}/club/${clubId2}/label/${labelId}`, {
        headers: {
          Authorization: "Bearer " + token2
        }
      })
      .then(response => {
        dispatch({
          type: ActionType.LABEL_DELETE
        });
        callback();
      })
      .catch(err => console.log(err));
  };
};
