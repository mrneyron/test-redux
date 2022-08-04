import {Dispatch} from "redux";
import axios from "axios";
import {ResultAction, ResultActionTypes} from "../../types/result";
import {resultListUrl} from '../../types/result'
import {FilterState} from '../../types/filter';

export const fetchResult = (state: FilterState, limit: number) => {
  return async (dispatch: Dispatch<ResultAction>) => {
    try {
      dispatch({type: ResultActionTypes.FETCH_RESULT})
      const res = await axios.get(resultListUrl, {
        params: {
          "filter[country]": state.country,
          "filter[city]": state.city,
          "filter[priceFrom]": state.priceFrom,
          "filter[priceTo]": state.priceTo,
          "filter[rating]": state.rating,
          offset: 0,
          limit,
        }
      })
      setTimeout(() => {
        dispatch({type: ResultActionTypes.FETCH_RESULT_SUCCESS, payload: res.data === null ? [] : res.data.data})
      }, 100);
    } catch (e) {
      dispatch({
        type: ResultActionTypes.FETCH_RESULT_ERROR,
        payload: 'Произошла ошибка при загрузке списка дел'
      })
    }
  }
};

export function setLimit(limit: number): ResultAction {
  return {type: ResultActionTypes.SET_LIMIT, payload: limit}
}

export function setOffset(offset: number): ResultAction {
  return {type: ResultActionTypes.SET_OFFSET, payload: offset}
}
