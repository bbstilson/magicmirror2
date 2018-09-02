/**
 * CONSTANTS
 */

const TOGGLE_WIDGET_INFO = 'TOGGLE_WIDGET_INFO';

/**
 * TYPES
 */

type ToggleWidgetInfo = {
  type: 'TOGGLE_WIDGET_INFO',
}

type Action =
  ToggleWidgetInfo

/**
 * ACTIONS
 */

export function toggleWidgetInfo(): ToggleWidgetInfo {
  return {
    type: TOGGLE_WIDGET_INFO
  };
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  expanded: false,
};

type State = {
  expanded: boolean,
}

export default (
  state: State = INITIAL_STATE,
  action: Action
) => {
  switch(action.type) {
    case (TOGGLE_WIDGET_INFO): {
      return {
        ...state,
        expanded: !state.expanded
      };
    }
    default: {
      return state;
    }
  }
}
