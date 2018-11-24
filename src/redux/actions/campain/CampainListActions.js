import {
  CAMPIAN_CAMPAIN_LIST_CHANGE_PROP,
  CAMPIAN_CAMPAIN_LIST_CHANGE_GIFT_PROP
} from '../../types';

export const campainCampainListChangeProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_LIST_CHANGE_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainListChangeGiftProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_LIST_CHANGE_GIFT_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainListSubmitForm = (clubId, form, token, history) => {

}