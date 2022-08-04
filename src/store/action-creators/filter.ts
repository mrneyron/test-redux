import {FilterAction, FilterActionTypes} from "../../types/filter";

export function setCountry(country: string): FilterAction {
  return {type: FilterActionTypes.SET_COUNTRY, payload: country}
}

export function setCity(city: string): FilterAction {
  return {type: FilterActionTypes.SET_CITY, payload: city}
}

export function setPriceFrom(priceFrom: number): FilterAction {
  return {type: FilterActionTypes.SET_PRICE_FROM, payload: priceFrom}
}

export function setPriceTo(priceTo: number): FilterAction {
  return {type: FilterActionTypes.SET_PRICE_TO, payload: priceTo}
}

export function setRating(rating: number | null): FilterAction {
  return {type: FilterActionTypes.SET_RATING, payload: rating}
}

