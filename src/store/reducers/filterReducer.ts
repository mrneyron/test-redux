import {FilterAction, FilterActionTypes, FilterState} from "../../types/filter";

const initialState: FilterState = {
  country: "",
  city: "",
  priceFrom: 400,
  priceTo: 3000,
  rating: null,
}

export const filterReducer = (state = initialState, action: FilterAction): FilterState => {
  switch (action.type) {
    case FilterActionTypes.SET_COUNTRY:
      return {...state, country: action.payload}
    case FilterActionTypes.SET_CITY:
      return {...state, city: action.payload}
    case FilterActionTypes.SET_PRICE_FROM:
      return {...state, priceFrom: action.payload}
    case FilterActionTypes.SET_PRICE_TO:
      return {...state, priceTo: action.payload}
    case FilterActionTypes.SET_RATING:
      return {...state, rating: action.payload}
    default:
      return state
  }
}
