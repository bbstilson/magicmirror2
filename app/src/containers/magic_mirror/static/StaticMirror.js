import StaticWidget from '../../../components/widget/StaticWidget.js';

import { getWidgetToDisplay } from '../../../widgets/index.js';

import { connect } from 'react-redux';
import React from 'react';

import './StaticMirror.css';

import type { AppState } from '../../../redux/modules/index.js';
import type { PositionsType } from '../../../redux/modules/widgets.js';

type Props = {|
  width: number,
  height: number,
  positions: PositionsType,
  displayWidgetBorders: boolean,
|};

const StaticMirror = ({ width, height, positions, displayWidgetBorders }: Props) => (
  <div className="static-mirror__container" style={{ width, height }}>
    {positions
      .valueSeq()
      .map(({ widget }) => {
        return (
          <StaticWidget
            key={widget.id}
            component={getWidgetToDisplay(widget.name)}
            position={positions.get(widget.id).position}
            displayWidgetBorders={displayWidgetBorders}
          />
        );
      })}
  </div>
);

function mapStateToProps({
  widgets: { positions },
  ui: { displayWidgetBorders }
}: AppState) {
  return {
    positions,
    displayWidgetBorders,
  };
}

export default connect(mapStateToProps)(StaticMirror);
