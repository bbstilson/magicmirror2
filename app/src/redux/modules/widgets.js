import Widget from '../../models/Widget.js';
import { WidgetModels } from '../../widgets/index.js';
import WidgetPosition from '../../models/WidgetPosition.js';

import * as Immutable from 'immutable';

import type { PositionRecord } from '../../models/Position.js';
import type { WidgetPositionRecord } from '../../models/WidgetPosition.js';

/**
 * CONSTANTS
 */

const ADD_WIDGET = 'ADD_WIDGET';
const REMOVE_WIDGET = 'REMOVE_WIDGET';
const UPDATE_WIDGET_POSITION = 'UPDATE_WIDGET_POSITION';

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

type Action =
  | AddWidget
  | RemoveWidget
  | UpdateWidgetPosition
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

/**
 * REDUCERS
 */

const INITIAL_STATE = {
  active: Immutable.Map(),
  available: WidgetModels,
  lastPositionSave: Immutable.Map(),
};

type State = {|
  available: Immutable.List<Widget>,
  active: Immutable.Map<string, WidgetPositionRecord>,
  lastPositionSave: Immutable.Map<string, WidgetPositionRecord>,
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
    default:
      return state;
  }
}
