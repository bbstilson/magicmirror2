import Position from './Position.js';
import Widget from './Widget.js';

import Immutable from 'immutable';

import type { PositionRecord } from './Position.js';

export type WidgetPositionProps = {|
  widget: Widget,
  position: PositionRecord,
  active: boolean,
|};

const defaultProps: WidgetPositionProps = {
  widget: Widget.empty(),
  position: Position(),
  active: null
};

export type WidgetPositionRecord = Immutable.Record<WidgetPositionProps> & WidgetPositionProps;

export default Immutable.Record(defaultProps);
