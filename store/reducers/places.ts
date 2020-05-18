import {
  IDefaultAction,
  IPlacesState
} from "../../models/store";
import { ADD_PLACES, SET_PLACES } from "../actions/types";
import { Place } from "../../models/places";

const initialState: IPlacesState = {
  places: [],
};

const placesReducer = (
  state: IPlacesState = initialState,
  action: IDefaultAction<any>
): IPlacesState => {
  switch (action.type) {
    case ADD_PLACES:
      const place = action.payload as Place;
      return {
        ...state,
        places: state.places.concat(place),
      };

    case SET_PLACES:
      const places = action.payload as Place[];
      return {
        ...state,
        places: places,
      };

    default:
      return state;
  }
};

export default placesReducer;
