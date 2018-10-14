import StaticWidget from '../../../components/widget/StaticWidget.js';

import { getWidgetToDisplay } from '../../../widgets/index.js';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import dashboardIcon from '../../../assets/dashboard.png';
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
  <React.Fragment>
    <div className="navigation-icon__container">
      <Link to="/dashboard">
        <img
          className="navigation-icon__icon"
          src={dashboardIcon}
          alt="Link to Dashboard."
        />
      </Link>
    </div>
    <div className="static-mirror__container" style={{ width, height }}>
      {positions
        .valueSeq()
        .filter(({ active }) => active)
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
  </React.Fragment>
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
