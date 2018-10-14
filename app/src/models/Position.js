import Immutable from 'immutable';

import type { RawWidgetPosition } from './Widget.js';

export type PositionProps = {|
  top: number,
  left: number
|};

export type PositionRecord = Immutable.Record<PositionProps> & PositionProps;

const defaultProps: PositionProps = {
  top: 0,
  left: 0
};

const Position = Immutable.Record(defaultProps)

Position.fromDbRow = (row: RawWidgetPosition) => Position({
  top: row.top,
  left: row.left
});


export default Position;
