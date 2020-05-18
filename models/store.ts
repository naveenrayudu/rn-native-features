import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Place } from "./places";

export interface IDefaultAction<T> {
    type: string,
    payload: T
}

export interface IPlacesState {
    places: Place[]
}

export interface IRootState {
    places: IPlacesState
}




export type IThunkDispatch<T> = ThunkDispatch<IRootState, null, IDefaultAction<T>>;
export type IThunkPromiseAction<R, T> = ThunkAction<Promise<R>, IRootState, null, IDefaultAction<T>>