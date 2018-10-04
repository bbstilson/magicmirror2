import StaticWidget from '../../../components/widget/StaticWidget.js';

import { Widgets } from '../../../widgets/index.js';

import './StaticMirror.css';

import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import React from 'react';

import type Widget from '../../../models/Widget.js';

type Props = {|
  width: number,
  height: number,
  active: Immutable.Map<string, Widget>,
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
