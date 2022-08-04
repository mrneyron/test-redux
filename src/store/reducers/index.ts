import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {resultReducer} from "./resultReducer";


export const rootReducer = combineReducers({
  filter: filterReducer,
  result: resultReducer
})

export type RootState = ReturnType<typeof rootReducer>
