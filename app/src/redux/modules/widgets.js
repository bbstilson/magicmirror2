import { WidgetModels } from '../../widgets/index.js';
import Widget from '../../models/Widget.js';

import * as Immutable from 'immutable';

import type { WidgetPosition } from '../../models/Widget.js';
import type { List, Map } from 'immutable';

/**
 * CONSTANTS
 */

const ADD_WIDGET = 'ADD_WIDGET';
const REMOVE_WIDGET = 'REMOVE_WIDGET';
const UPDATE_WIDGET_POSITION = 'UPDATE_WIDGET_POSITION';

/**
 * TYPES
 */

export type AddWidget = {
  type: 'ADD_WIDGET',
  widget: Widget,
}
export type RemoveWidget = {
  type: 'REMOVE_WIDGET',
  widget: Widget,
}
export type UpdateWidgetPosition = {
  type: 'UPDATE_WIDGET_POSITION',
  widget: Widget,
  position: WidgetPosition,
}

type Action =
  | AddWidget
  | RemoveWidget
  | UpdateWidgetPosition

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

export function updateWidgetPosition (widget: Widget, position: WidgetPosition): UpdateWidgetPosition {
  return {
    widget,
    position,
    type: UPDATE_WIDGET_POSITION
  };
}

/**
 * REDUCERS
 */

function updatePosition(action: UpdateWidgetPosition): any {
  return (w: Widget): Widget => {
    if (w.name === action.widget.name) {
      return w.updatePosition(action.position);
    }

    return w;
  }
}


const INITIAL_STATE = {
  active: Immutable.Map(),
  available: WidgetModels,
};

type State = {
  active: Map<string, Widget>,
  available: List<Widget>,
}

export default (
  state: State = INITIAL_STATE,
  action: Action,
) => {
  const { active } = state;

  switch(action.type) {
    case ADD_WIDGET:
      return {
        ...state,
        active: active.set(action.widget.name, action.widget)
      };
    case REMOVE_WIDGET:
      return {
        ...state,
        active: active.delete(action.widget.name)
      };
    case UPDATE_WIDGET_POSITION:
      // This makes flow happy for some reason...
      const newActive: Map<string, Widget> = active.map(updatePosition(action));
      return {
        ...state,
        active: newActive
      };
    default:
      return state;
  }
}
