export const countryListUrl = "http://92.255.77.149/api/search/list";

export interface FilterState {
  country: string;
  city: string;
  priceFrom: number;
  priceTo: number;
  rating: number | null;
}

export enum FilterActionTypes {
  SET_COUNTRY = 'SET_COUNTRY',
  SET_CITY = 'SET_CITY',
  SET_PRICE_FROM = 'SET_PRICE_FROM',
  SET_PRICE_TO = 'SET_PRICE_TO',
  SET_RATING = 'SET_RATING',
}

interface SetCountryAction {
  type: FilterActionTypes.SET_COUNTRY;
  payload: string;
}

interface SetCityAction {
  type: FilterActionTypes.SET_CITY;
  payload: string;
}

interface SetPriceFromAction {
  type: FilterActionTypes.SET_PRICE_FROM;
  payload: number;
}

interface SetPriceToAction {
  type: FilterActionTypes.SET_PRICE_TO;
  payload: number;
}

interface SetRatingAction {
  type: FilterActionTypes.SET_RATING;
  payload: number | null;
}


export type FilterAction = SetCountryAction | SetCityAction | SetPriceFromAction | SetPriceToAction | SetRatingAction;
