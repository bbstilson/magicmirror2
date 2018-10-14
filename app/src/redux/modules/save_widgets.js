import { EndPoint } from '../../constants/Api.js';
import { getStateDiff, rowsToPositionState } from '../redux_utils.js';
import { setPositionState } from './widgets.js';

import axios from 'axios';

/**
 * CONSTANTS
 */

const SAVE_WIDGET_POSITIONS_START = 'SAVE_WIDGET_POSITIONS_START';
const SAVE_WIDGET_POSITIONS_SUCCESS = 'SAVE_WIDGET_POSITIONS_SUCCESS';
const SAVE_WIDGET_POSITIONS_FAILURE = 'SAVE_WIDGET_POSITIONS_FAILURE';

/**
 * TYPES
 */

export type SaveWidgetPositionsStart = {|
  type: 'SAVE_WIDGET_POSITIONS_START'
|};

export type SaveWidgetPositions = {|
  type: 'SAVE_WIDGET_POSITIONS'
|};

export type SaveWidgetPositionsSuccess = {|
  type: 'SAVE_WIDGET_POSITIONS_SUCCESS'
|};

export type SaveWidgetPositionsFailure = {|
  type: 'SAVE_WIDGET_POSITIONS_FAILURE'
|};

type Action =
  | SaveWidgetPositionsStart
  | SaveWidgetPositions
  | SaveWidgetPositionsSuccess
  | SaveWidgetPositionsFailure
;

/**
 * ACTIONS
 */

export function saveWidgetPositionsStart(): SaveWidgetPositionsStart {
  return {
    type: SAVE_WIDGET_POSITIONS_START
  };
}

export function saveWidgetPositionsSuccess(): SaveWidgetPositionsSuccess {
  return {
    type: SAVE_WIDGET_POSITIONS_SUCCESS
  };
}

export function saveWidgetPositionsFailure(): SaveWidgetPositionsFailure {
  return {
    type: SAVE_WIDGET_POSITIONS_FAILURE
  };
}

export function saveWidgetPositions(): Function {
  return (dispatch, getState) => {
    dispatch(saveWidgetPositionsStart());

    const positionsToSave = getStateDiff(getState())
      .map(({
        active,
        widget: { id },
        position: { top, left }
      }) => ({
        id,
        top,
        left,
        active,
      }))
      .toJS();

    return axios({
      method: 'PUT',
      url: EndPoint.WIDGETS,
      data: JSON.stringify(positionsToSave),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(({ data: rows }) => {
        dispatch(setPositionState(rowsToPositionState(rows)));
        dispatch(saveWidgetPositionsSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(saveWidgetPositionsFailure());
      });
  };
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  isSaving: false,
  saveError: false,
};

export type SaveWidgetsReducerState = {|
  isSaving: boolean,
  saveError: boolean,
|};

export default (
  state: SaveWidgetsReducerState = INITIAL_STATE,
  action: Action,
) => {
  switch(action.type) {
    case SAVE_WIDGET_POSITIONS_START: {
      return {
        ...state,
        isSaving: true,
        saveError: false,
      };
    }
    case SAVE_WIDGET_POSITIONS_SUCCESS: {
      return {
        ...state,
        isSaving: false,
        saveError: false,
      };
    }
    case SAVE_WIDGET_POSITIONS_FAILURE: {
      return {
        ...state,
        isSaving: false,
        saveError: true,
      };
    }
    default: {
      return state;
    }
  }
}
