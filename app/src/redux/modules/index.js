import fetchWidgets from './fetch_widgets.js';
import saveWidgets from './save_widgets.js';
import ui from './ui.js';
import widgets from './widgets.js';

import { combineReducers } from 'redux';

import type { FetchWidgetsReducerState } from './fetch_widgets.js';
import type { SaveWidgetsReducerState } from './save_widgets.js';
import type { WidgetsReducerState } from './widgets.js';
import type { UiReducerState } from './ui.js';

export type AppState = {|
  fetchWidgets: FetchWidgetsReducerState,
  saveWidgets: SaveWidgetsReducerState,
  widgets: WidgetsReducerState,
  ui: UiReducerState,
|};

export default combineReducers({
  fetchWidgets,
  saveWidgets,
  ui,
  widgets,
});
