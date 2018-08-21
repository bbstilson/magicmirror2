import modules from '../../modules/index.js';
import Module from '../../models/Module.js';

import type { ModulePosition } from '../../models/Module.js';

type Action = {
  type: string,
}
type AddModule = {
  module: Module,
}
type RemoveModule = {
  module: Module,
}
type UpdateModulePosition = {
  module: Module,
  position: ModulePosition,
}

type AddModuleAction = AddModule & Action
type RemoveModuleAction = RemoveModule & Action
type UpdateModulePositionAction = UpdateModulePosition & Action

type ModuleAction =
  | Action
  | AddModuleAction
  | RemoveModuleAction
  | UpdateModulePositionAction

/**
 * CONSTANTS
 */

const ADD_MODULE = 'ADD_MODULE';
const REMOVE_MODULE = 'REMOVE_MODULE';
const UPDATE_MODULE_POSITION = 'UPDATE_MODULE_POSITION';

/**
 * ACTIONS
 */

export function addModule (module: Module): AddModuleAction {
  return {
    module,
    type: ADD_MODULE,
  };
}

export function removeModule (module: Module): RemoveModuleAction {
  return {
    module,
    type: REMOVE_MODULE
  };
}

export function updateModulePosition (module: Module, position: ModulePosition): UpdateModulePositionAction {
  return {
    module,
    position,
    type: UPDATE_MODULE_POSITION
  };
}

/**
 * REDUCERS
 */

const updatePosition = (module: Module, action: UpdateModulePositionAction): Module => {
  if (module.name === action.module.name && action.type === UPDATE_MODULE_POSITION) {
    return module.updatePosition(action.position);
  }

  return module;
}

const INITIAL_STATE = {
  activeMap: {},
  activeModules: [],
  available: modules
};

const DEFAULT_ACTION = {
  type: '__INIT__'
}

type InitialState = {
  activeMap: Object,
  activeModules: Array<Module>,
  available: Array<Module>
}

export default (
  state: InitialState = INITIAL_STATE,
  action: ModuleAction = DEFAULT_ACTION
) => {
  switch(action.type) {
    case ADD_MODULE:
      return {
        ...state,
        activeMap: {
          ...state.activeMap,
          [action.module.name]: true
        },
        activeModules: [
          ...state.activeModules,
          action.module
        ]
      };
    case REMOVE_MODULE:
      return {
        ...state,
        activeMap: {
          ...state.activeMap,
          [action.module.name]: false
        },
        activeModules: state.activeModules.filter(m => m.name !== action.module.name)
      };
    case UPDATE_MODULE_POSITION: {
      return {
        ...state,
        activeModules: state.activeModules.map(m => updatePosition(m, action))
      };
    }

    default:
      return state;
  }
}
