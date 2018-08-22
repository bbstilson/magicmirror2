import modules from '../../modules/index.js';
import Module from '../../models/Module.js';

import * as Immutable from 'immutable';

import type { ModulePosition } from '../../models/Module.js';
import type { List, Map } from 'immutable';

/**
 * CONSTANTS
 */

const ADD_MODULE = 'ADD_MODULE';
const REMOVE_MODULE = 'REMOVE_MODULE';
const UPDATE_MODULE_POSITION = 'UPDATE_MODULE_POSITION';

/**
 * TYPES
 */

type AddModule = {
  type: 'ADD_MODULE',
  module: Module,
}
type RemoveModule = {
  type: 'REMOVE_MODULE',
  module: Module,
}
type UpdateModulePosition = {
  type: 'UPDATE_MODULE_POSITION',
  module: Module,
  position: ModulePosition,
}

type Action =
  | AddModule
  | RemoveModule
  | UpdateModulePosition

/**
 * ACTIONS
 */

export function addModule (module: Module): AddModule {
  return {
    module,
    type: ADD_MODULE,
  };
}

export function removeModule (module: Module): RemoveModule {
  return {
    module,
    type: REMOVE_MODULE
  };
}

export function updateModulePosition (module: Module, position: ModulePosition): UpdateModulePosition {
  return {
    module,
    position,
    type: UPDATE_MODULE_POSITION
  };
}

/**
 * REDUCERS
 */

function updatePosition(action: UpdateModulePosition): any {
  return (m: Module): Module => {
    if (m.name === action.module.name) {
      return m.updatePosition(action.position);
    }

    return m;
  }
}


const INITIAL_STATE = {
  active: Immutable.Map(),
  available: Immutable.List(modules),
};

type State = {
  active: Map<string, Module>,
  available: List<Module>,
}

export default (
  state: State = INITIAL_STATE,
  action: Action,
) => {
  const { active } = state;

  switch(action.type) {
    case ADD_MODULE:
      return {
        ...state,
        active: active.set(action.module.name, action.module)
      };
    case REMOVE_MODULE:
      return {
        ...state,
        active: active.delete(action.module.name)
      };
    case UPDATE_MODULE_POSITION:
      // This makes flow happy for some reason...
      const newActive: Map<string, Module> = active.map(updatePosition(action));
      return {
        ...state,
        active: newActive
      };
    default:
      return state;
  }
}
