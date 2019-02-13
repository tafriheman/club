import ActionType from "../../types/orderStatus";
import axios from "axios";
import config from "../../../config.json";

export const getOrderStatus = (token, callback) => {
  return dispatch => {
    dispatch({
      type: ActionType.ORDERSTATUS_LOADING
    });

    axios
      .get(`${config.domain}/order/statusList`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        dispatch({
          type: ActionType.ORDERSTATUS_LIST,
          payload: response.data
        });
        dispatch({
          type: ActionType.ORDERSTATUS_DONE
        });
        if (typeof callback === "function") callback();
      })
      .catch(err => console.log(err));
  };
};
