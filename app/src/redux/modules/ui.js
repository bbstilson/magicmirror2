/**
 * CONSTANTS
 */

const TOGGLE_MODULE_INFO = 'TOGGLE_MODULE_INFO';

/**
 * TYPES
 */

type ToggleModuleInfo = {
  type: 'TOGGLE_MODULE_INFO',
}

type Action =
  ToggleModuleInfo

/**
 * ACTIONS
 */

export function toggleModuleInfo(): ToggleModuleInfo {
  return {
    type: TOGGLE_MODULE_INFO
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
    case (TOGGLE_MODULE_INFO): {
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
