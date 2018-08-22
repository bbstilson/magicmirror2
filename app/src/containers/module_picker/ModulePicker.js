import Module from '../../components/module/Module.js';

import ModuleModel from '../../models/Module.js';

import './ModulePicker.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { List } from 'immutable';

type Props = {
  available: List<ModuleModel>,
}

class ModulePicker extends Component<Props> {
  render() {
    const { available } = this.props;

    return (
      <div className="module-picker flex--column--center">
        <div className="full-width">
          {available.map(mod => <Module key={mod.name} module={mod} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ modules: { available }}) {
  return {
    available,
  };
}

export default connect(mapStateToProps)(ModulePicker);
