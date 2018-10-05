import SaveWidgetPositions from '../../components/SaveWidgetPositions.js';
import Widget from '../../components/widget/Widget.js';

import WidgetModel from '../../models/Widget.js';

import './WidgetPicker.css';

import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import React, { Component } from 'react';

type Props = {|
  available: Immutable.List<WidgetModel>,
|};

class WidgetPicker extends Component<Props> {
  render() {
    const { available } = this.props;

    return (
      <div className="widget-picker flex--column--center">
        <div className="full-width">
          {available.map((mod) => <Widget key={mod.name} widget={mod} />)}
          <SaveWidgetPositions />
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ widgets: { available }}) {
  return {
    available,
  };
}

export default connect(mapStateToProps)(WidgetPicker);
