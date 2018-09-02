import StaticWidget from '../../../components/widget/StaticWidget.js';

import { Widgets } from '../../../widgets/index.js';

import './StaticMirror.css';

import type Widget from '../../../models/Widget.js';
import type { Map } from 'immutable';

import { connect } from 'react-redux';
import React from 'react';

type Props = {|
  width: number,
  height: number,
  active: Map<string, Widget>,
  displayModuleBorders: boolean,
|};

const StaticMirror = ({ width, height, active, displayModuleBorders }: Props) => (
  <div className="static-mirror__container" style={{ width, height }}>
    {active.keySeq().map((widgetName) => {
      return (
        <StaticWidget
          key={widgetName}
          component={Widgets.get(widgetName)}
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
