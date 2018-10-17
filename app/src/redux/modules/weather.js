import GeoLocation from '../../models/GeoLocation.js';

/**
 * CONSTANTS
 */

const GET_COORDINATES_START = 'GET_COORDINATES_START';
const GET_COORDINATES_SUCCESS = 'GET_COORDINATES_SUCCESS';
const GET_COORDINATES_FAILURE = 'GET_COORDINATES_FAILURE';

/**
 * TYPES
 */

export type GetCoordinatesStart = {|
  type: 'GET_COORDINATES_START',
|};

export type GetCoordinatesSuccess = {|
  geoLocation: GeoLocation,
  type: 'GET_COORDINATES_SUCCESS',
|};

export type GetCoordinatesFailure = {|
  type: 'GET_COORDINATES_FAILURE',
|};

type Action =
  | GetCoordinatesStart
  | GetCoordinatesSuccess
  | GetCoordinatesFailure
;

/**
 * ACTIONS
 */

export function getCoordinates(): Function {
  return (dispatch) => {
    dispatch(getCoordinatesStart());

    if (navigator && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(getCoordinatesSuccess(GeoLocation.fromJs(position.coords)));
      });
    } else {
      dispatch(getCoordinatesFailure());
    }
  }
}

export function getCoordinatesStart(): GetCoordinatesStart {
  return {
    type: 'GET_COORDINATES_START',
  };
}

export function getCoordinatesSuccess(geoLocation: GeoLocation): GetCoordinatesSuccess {
  return {
    geoLocation, 
    type: 'GET_COORDINATES_SUCCESS',
  };
}

export function getCoordinatesFailure(): GetCoordinatesFailure {
  return {
    type: 'GET_COORDINATES_FAILURE',
  };
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  latitude: 0,
  longitude: 0,
  error: false,
  isFetching: true,
};

export type WeatherReducerState = {|
  latitude: number,
  longitude: number,
  error: boolean,
  isFetching: boolean,
|};

export default function weatherReducer(
  state: WeatherReducerState = INITIAL_STATE,
  action: Action,
) {
  switch(action.type) {
    case GET_COORDINATES_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case GET_COORDINATES_SUCCESS: {
      const { latitude, longitude } = action.geoLocation;
      return {
        ...state,
        latitude,
        longitude,
        isFetching: false,
        error: false,
      };
    }
    case GET_COORDINATES_FAILURE: {
      return {
        ...state,
        latitude: 0,
        longitude: 0,
        isFetching: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
}
