import Position from '../../models/Position.js';
import WidgetPosition from '../../models/WidgetPosition.js';

import * as Immutable from 'immutable';

/**
 * CONSTANTS
 */

const ADD_WIDGET = 'ADD_WIDGET';
const REMOVE_WIDGET = 'REMOVE_WIDGET';
const UPDATE_WIDGET_POSITION = 'UPDATE_WIDGET_POSITION';
const UNDO_WIDGET_POSITION_CHANGES = 'UNDO_WIDGET_POSITION_CHANGES';
const SET_POSITION_STATE = 'SET_POSITION_STATE';

/**
 * TYPES
 */

export type PositionsType = Immutable.Map<number, WidgetPosition>;

export type AddWidget = {|
  type: 'ADD_WIDGET',
  id: number,
|};

export type RemoveWidget = {|
  type: 'REMOVE_WIDGET',
  id: number,
|};

export type UpdateWidgetPosition = {|
  type: 'UPDATE_WIDGET_POSITION',
  id: number,
  position: Position,
|};

export type UndoWidgetPositionChanges = {|
  type: 'UNDO_WIDGET_POSITION_CHANGES'
|};

export type SetPositionState = {|
  type: 'SET_POSITION_STATE',
  positions: PositionsType
|};

type Action =
  | AddWidget
  | RemoveWidget
  | UpdateWidgetPosition
  | UndoWidgetPositionChanges
  | SetPositionState
;

/**
 * ACTIONS
 */

export function addWidget (id: number): AddWidget {
  return {
    id,
    type: ADD_WIDGET,
  };
}

export function removeWidget (id: number): RemoveWidget {
  return {
    id,
    type: REMOVE_WIDGET,
  };
}

export function updateWidgetPosition (id: number, position: Position): UpdateWidgetPosition {
  return {
    id,
    position,
    type: UPDATE_WIDGET_POSITION,
  };
}

export function undoWidgetPositionChanges(): UndoWidgetPositionChanges {
  return {
    type: UNDO_WIDGET_POSITION_CHANGES
  };
}

export function setPositionState(positions: PositionsType): SetPositionState {
  return {
    positions,
    type: SET_POSITION_STATE,
  };
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  positions: Immutable.Map(),
  lastPositionSave: Immutable.Map(),
};

export type WidgetsReducerState = {|
  positions: PositionsType,
  lastPositionSave: PositionsType,
|};

export default (
  state: WidgetsReducerState = INITIAL_STATE,
  action: Action,
) => {
  switch(action.type) {
    case ADD_WIDGET: {
      const { id } = action;
      return {
        ...state,
        positions: state.positions.update(id, (widgetPosition) =>
          widgetPosition.update('active', () => true)
        ),
      };
    }
    case REMOVE_WIDGET: {
      const { id } = action;
      return {
        ...state,
        positions: state.positions.update(id, (widgetPosition) =>
          widgetPosition.update('active', () => false)
        ),
      };
    }
    case UPDATE_WIDGET_POSITION: {
      const { id, position } = action;
      return {
        ...state,
        positions: state.positions.update(id, (widgetPosition) =>
          widgetPosition.update('position', () => position)
        ),
      };
    }
    case UNDO_WIDGET_POSITION_CHANGES: {
      return {
        ...state,
        positions: state.lastPositionSave,
      };
    }
    case SET_POSITION_STATE: {
      const { positions } = action;
      return {
        ...state,
        positions,
        lastPositionSave: positions,
      };
    }
    default: {
      return state;
    }
  }
}
