export const resultListUrl = "http://92.255.77.149/api/search/get";

export interface ResultState {
  result: ResultDate[];
  loading: boolean;
  limit: number;
  offset: number;
  error: null | string;
}

export interface ResultDate {
  id: number;
  country: string;
  city: string;
  price: number;
  rating: number | null;
}

export enum ResultActionTypes {
  FETCH_RESULT= 'FETCH_RESULT',
  FETCH_RESULT_SUCCESS= 'FETCH_RESULT_SUCCESS',
  FETCH_RESULT_ERROR= 'FETCH_RESULT_ERROR',
  SET_LIMIT = 'SET_LIMIT',
  SET_OFFSET = 'SET_OFFSET',
}
interface FetchResultAction {
  type: ResultActionTypes.FETCH_RESULT
}
interface FetchResultSuccessAction {
  type: ResultActionTypes.FETCH_RESULT_SUCCESS;
  payload: ResultDate[];
}
interface FetchResultErrorAction {
  type: ResultActionTypes.FETCH_RESULT_ERROR;
  payload: string;
}
interface SetLimit {
  type: ResultActionTypes.SET_LIMIT;
  payload: number;
}

interface SetOffset {
  type: ResultActionTypes.SET_OFFSET;
  payload: number;
}

export type ResultAction =
  FetchResultAction
  | FetchResultErrorAction
  | FetchResultSuccessAction
  | SetLimit
  | SetOffset;
