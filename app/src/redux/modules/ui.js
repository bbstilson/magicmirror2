/**
 * CONSTANTS
 */

const TOGGLE_WIDGET_INFO = 'TOGGLE_WIDGET_INFO';
const TOGGLE_DISPLAY_WIDGET_BORDERS = 'TOGGLE_DISPLAY_WIDGET_BORDERS';

/**
 * TYPES
 */

type ToggleWidgetInfo = {|
  type: 'TOGGLE_WIDGET_INFO',
|};

type ToggleDisplayWidgetBorders = {|
  type: 'TOGGLE_DISPLAY_WIDGET_BORDERS'
|};

type Action =
  | ToggleWidgetInfo
  | ToggleDisplayWidgetBorders
;

/**
 * ACTIONS
 */

export function toggleWidgetInfo(): ToggleWidgetInfo {
  return {
    type: TOGGLE_WIDGET_INFO
  };
}

export function toggleDisplayWidgetBorders(): ToggleDisplayWidgetBorders {
  return {
    type: TOGGLE_DISPLAY_WIDGET_BORDERS
  };
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  expanded: false,
  displayWidgetBorders: false,
};

export type UiReducerState = {|
  expanded: boolean,
  displayWidgetBorders: boolean,
|};

export default (
  state: UiReducerState = INITIAL_STATE,
  action: Action
) => {
  switch(action.type) {
    case TOGGLE_WIDGET_INFO: {
      return {
        ...state,
        expanded: !state.expanded
      };
    }
    case TOGGLE_DISPLAY_WIDGET_BORDERS: {
      return {
        ...state,
        displayWidgetBorders: !state.displayWidgetBorders
      };
    }
    default: {
      return state;
    }
  }
}
