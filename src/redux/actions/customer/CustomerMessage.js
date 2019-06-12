import axios from "axios";
import config from "../../../config.json";
import _ from "lodash";

export const getMessage = (form, userId, token) => {
  const { pagenum, pagesize } = form;
  return dispatch => {
    return axios
      .get(
        `${
          config.domain
        }/user/${userId}/message?pagenum=${pagenum}&pagesize=${pagesize}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        return response;
      })
      .catch(e => {});
  };
};
