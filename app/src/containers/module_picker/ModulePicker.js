// import Module from '../../components/ModulePicker/Module';
import { addModule, removeModule } from '../../redux/modules/modules.js';

import ModuleModel from '../../models/Module.js';

import './ModulePicker.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';


const Module = () => (<p>hi</p>);

type Props = {
  activeMap: { [string]: boolean },
  available: Array<ModuleModel>,
  addModule: Function,
  removeModule: Function,
}

class ModulePicker extends Component<Props> {
  add = () => {}

  remove = () => {}

  render() {
    const { available } = this.props;
    const activeMap = {}

    return (
      <div className="module-picker flex--column--center">
        <div className="full-width">
          {available.map(mod =>
            <Module
                key={mod.name}
                add={this.add}
                remove={this.remove}
                module={mod}
                active={activeMap[mod.name] || false} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ modules: { activeMap, available }}) {
  return {
    activeMap,
    available
  };
}

const dispatchToProps = {
  addModule,
  removeModule
};

export default connect(mapStateToProps, dispatchToProps)(ModulePicker);
