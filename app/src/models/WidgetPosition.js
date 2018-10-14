import Position from './Position.js';
import Widget from './Widget.js';

import Immutable from 'immutable';

import type { PositionRecord } from './Position.js';
import type { RawWidgetPosition } from './Widget.js';

export type WidgetPositionProps = {|
  widget: Widget,
  position: PositionRecord,
  active: boolean,
|};

export type WidgetPositionRecord = Immutable.Record<WidgetPositionProps> & WidgetPositionProps;

const defaultProps: WidgetPositionProps = {
  widget: Widget.empty(),
  position: Position(),
  active: false
};

const WidgetPosition = Immutable.Record(defaultProps);

WidgetPosition.fromDbRow = (row: RawWidgetPosition) => WidgetPosition({
  widget: Widget.fromDbRow(row),
  position: Position.fromDbRow(row),
  active: row.active
})

export default WidgetPosition;
