import {
  DASHBOARD_TRANSACTIONS_FETCH_TRANSACTIONS
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';


export const dashboardTransactionsFetchTransactions = (clubId, pageNum, pageSize, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/transaction?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: { Authorization: 'Bearer ' + token}})
      .then(response => { 
          dispatch({
          type: DASHBOARD_TRANSACTIONS_FETCH_TRANSACTIONS,
          payload: {
            transactions: response.data,
            total: response.headers.total
          }
        })
      })
      .catch();
  }
}