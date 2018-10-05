import StaticWidget from '../../../components/widget/StaticWidget.js';

import { Widgets } from '../../../widgets/index.js';
import WidgetPosition from '../../../models/WidgetPosition.js';

import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import React from 'react';

import './StaticMirror.css';

type Props = {|
  width: number,
  height: number,
  active: Immutable.Map<string, WidgetPosition>,
  displayModuleBorders: boolean,
|};

const StaticMirror = ({ width, height, active, displayModuleBorders }: Props) => (
  <div className="static-mirror__container" style={{ width, height }}>
    {active.keySeq().map((widgetName) => {
      return (
        <StaticWidget
          key={widgetName}
          component={Widgets.get(widgetName)}
          position={active.get(widgetName).position}
          displayModuleBorders={displayModuleBorders}
        />
      );
    })}
  </div>
);

function mapStateToProps({ widgets: { active }, ui: { displayModuleBorders }}) {
  return {
    active,
    displayModuleBorders,
  };
}

export default connect(mapStateToProps)(StaticMirror);
