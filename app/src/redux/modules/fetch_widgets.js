import { EndPoint } from '../../constants/Api.js';
import { rowsToPositionState } from '../redux_utils.js';
import { setPositionState } from './widgets.js';

import axios from 'axios';

/**
 * CONSTANTS
 */

const FETCH_WIDGET_POSITIONS_START = 'FETCH_WIDGET_POSITIONS_START';
const FETCH_WIDGET_POSITIONS_SUCCESS = 'FETCH_WIDGET_POSITIONS_SUCCESS';
const FETCH_WIDGET_POSITIONS_FAILURE = 'FETCH_WIDGET_POSITIONS_FAILURE';

/**
 * TYPES
 */

export type FetchWidgetPositionsStart = {|
  type: 'FETCH_WIDGET_POSITIONS_START'
|};

export type FetchWidgetPositionsSuccess = {|
  type: 'FETCH_WIDGET_POSITIONS_SUCCESS'
|};

export type FetchWidgetPositionsFailure = {|
  type: 'FETCH_WIDGET_POSITIONS_FAILURE'
|};

type Action =
  | FetchWidgetPositionsStart
  | FetchWidgetPositionsSuccess
  | FetchWidgetPositionsFailure
;

/**
 * ACTIONS
 */

function fetchWidgetPositionsStart(): FetchWidgetPositionsStart {
  return {
    type: FETCH_WIDGET_POSITIONS_START
  };
}

function fetchWidgetPositionsSuccess(): FetchWidgetPositionsSuccess {
  return {
    type: FETCH_WIDGET_POSITIONS_SUCCESS
  };
}

function fetchWidgetPositionsFailure(): FetchWidgetPositionsFailure {
  return {
    type: FETCH_WIDGET_POSITIONS_FAILURE
  };
}

export function fetchWidgetPositions(): Function {
  return (dispatch) => {
    dispatch(fetchWidgetPositionsStart());

    return axios({
      method: 'GET',
      url: EndPoint.WIDGETS
    })
      .then(({ data: rows }) => {
        dispatch(setPositionState(rowsToPositionState(rows)));
        dispatch(fetchWidgetPositionsSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(fetchWidgetPositionsFailure());
      })
  }
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  isFetching: false,
  fetchError: false,
};

export type FetchWidgetsReducerState = {|
  isFetching: boolean,
  fetchError: boolean,
|};

export default (
  state: FetchWidgetsReducerState = INITIAL_STATE,
  action: Action,
) => {
  switch(action.type) {
    case FETCH_WIDGET_POSITIONS_START: {
      return {
        ...state,
        isFetching: true,
        fetchError: false,
      };
    }
    case FETCH_WIDGET_POSITIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        fetchError: false,
      };
    }
    case FETCH_WIDGET_POSITIONS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: true,
      };
    }
    default: {
      return state;
    }
  }
}
