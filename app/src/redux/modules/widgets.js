import Widget from '../../models/Widget.js';
import { WidgetModels } from '../../widgets/index.js';
import WidgetPosition from '../../models/WidgetPosition.js';

import axios from 'axios';
import * as Immutable from 'immutable';

import type { PositionRecord } from '../../models/Position.js';
import type { WidgetPositionRecord } from '../../models/WidgetPosition.js';

/**
 * CONSTANTS
 */

const ADD_WIDGET = 'ADD_WIDGET';
const REMOVE_WIDGET = 'REMOVE_WIDGET';
const UPDATE_WIDGET_POSITION = 'UPDATE_WIDGET_POSITION';
const SAVING_WIDGET_POSITIONS = 'SAVING_WIDGET_POSITIONS';
const SAVING_WIDGET_POSITIONS_SUCCESS = 'SAVING_WIDGET_POSITIONS_SUCCESS';
const SAVING_WIDGET_POSITIONS_FAILURE = 'SAVING_WIDGET_POSITIONS_FAILURE';

/**
 * TYPES
 */

export type AddWidget = {|
  type: 'ADD_WIDGET',
  widget: Widget,
|};

export type RemoveWidget = {|
  type: 'REMOVE_WIDGET',
  widget: Widget,
|};

export type UpdateWidgetPosition = {|
  type: 'UPDATE_WIDGET_POSITION',
  widget: Widget,
  position: PositionRecord,
|};

export type SaveWidgetPositions = {|
  type: 'SAVE_WIDGET_POSITIONS'
|};

export type SavingWidgetPosition = {|
  type: 'SAVING_WIDGET_POSITIONS'
|};

export type SavingWidgetPositionSuccess = {|
  type: 'SAVING_WIDGET_POSITIONS_SUCCESS'
|};

export type SavingWidgetPositionFailure = {|
  type: 'SAVING_WIDGET_POSITIONS_FAILURE'
|};


type Action =
  | AddWidget
  | RemoveWidget
  | UpdateWidgetPosition
  | SaveWidgetPositions
  | SavingWidgetPosition
  | SavingWidgetPositionSuccess
  | SavingWidgetPositionFailure
;

/**
 * ACTIONS
 */

export function addWidget (widget: Widget): AddWidget {
  return {
    widget,
    type: ADD_WIDGET,
  };
}

export function removeWidget (widget: Widget): RemoveWidget {
  return {
    widget,
    type: REMOVE_WIDGET
  };
}

export function updateWidgetPosition (widget: Widget, position: PositionRecord): UpdateWidgetPosition {
  return {
    widget,
    position,
    type: UPDATE_WIDGET_POSITION
  };
}

function savingWidgetPosition(): SavingWidgetPosition {
  return {
    type: SAVING_WIDGET_POSITIONS
  };
}

function savingWidgetPositionSuccess(): SavingWidgetPositionSuccess {
  return {
    type: SAVING_WIDGET_POSITIONS_SUCCESS
  };
}

function savingWidgetPositionFailure(): SavingWidgetPositionFailure {
  return {
    type: SAVING_WIDGET_POSITIONS_FAILURE
  };
}

export function saveWidgetPositions(widgetPositions: Immutable.List<WidgetPositionRecord>): Function {
  return (dispatch) => {
    dispatch(savingWidgetPosition());

    const positionsToSave = widgetPositions
      .map(({ widget: { name }, position: { top, left }}) => ({
        top,
        left,
        widgetName: name
      }))
      .toJS();

    console.log(`http://localhost:4000/api/widgets`, positionsToSave);

    axios({
      url: 'http://localhost:4000/api/widgets',
      method: 'put',
      body: JSON.stringify(positionsToSave),
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // }
    })
      .then((data) => {
        console.log(data);
        dispatch(savingWidgetPositionSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(savingWidgetPositionFailure());
      });
  };
}


/**
 * REDUCERS
 */

const INITIAL_STATE = {
  active: Immutable.Map(),
  available: WidgetModels,
  lastPositionSave: Immutable.Map(),
  savingPositions: false,
  savePositionsError: false,
};

type State = {|
  available: Immutable.List<Widget>,
  active: Immutable.Map<string, WidgetPositionRecord>,
  lastPositionSave: Immutable.Map<string, WidgetPositionRecord>,
  savingPositions: boolean,
  savePositionsError: boolean,
|};

export default (
  state: State = INITIAL_STATE,
  action: Action,
) => {
  const { active } = state;

  switch(action.type) {
    case ADD_WIDGET: {
      const { widget, widget: { name }} = action;
      return {
        ...state,
        active: active.set(name, {
          widget,
          position: { top: 0, left: 0 }
        }),
      };
    }
    case REMOVE_WIDGET: {
      return {
        ...state,
        active: active.delete(action.widget.name),
      };
    }
    case UPDATE_WIDGET_POSITION: {
      const { position, widget: { name }} = action;
      return {
        ...state,
        active: active.update(name, ({ widget }) =>
          WidgetPosition({ position, widget })
        ),
      };
    }
    case SAVING_WIDGET_POSITIONS: {
      return {
        ...state,
        savingPositions: true,
        savePositionsError: false,
      };
    }
    case SAVING_WIDGET_POSITIONS_SUCCESS: {
      return {
        ...state,
        savingPositions: false,
        savePositionsError: false,
      }
    }
    case SAVING_WIDGET_POSITIONS_FAILURE: {
      return {
        ...state,
        savingPositions: false,
        savePositionsError: true,
      }
    }
    default:
      return state;
  }
}
