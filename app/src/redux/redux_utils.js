import WidgetPosition from '../models/WidgetPosition.js';

import * as Immutable from 'immutable';

import type { AppState } from './modules/index.js';
import type { PositionsType } from './modules/widgets.js';
import type { RawWidgetPosition } from '../models/Widget.js';

export function rowsToPositionState(rows: Array<RawWidgetPosition>): PositionsType {
  return rows
    .reduce(
      (state, row: RawWidgetPosition) => state.set(row.id, WidgetPosition.fromDbRow(row)),
      Immutable.Map());
}

export function getStateDiff(
  { widgets: { positions, lastPositionSave }
}: AppState): Immutable.List<WidgetPosition> {
  return positions
    .filter(({ widget, position, active }) => {
      const {
        position: lastPosition,
        active: lastActive
      } = lastPositionSave.get(widget.id);

      return active !== lastActive || !position.equals(lastPosition);
    })
    .valueSeq()
    .toList();
}
