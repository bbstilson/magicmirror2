import { saveWidgetPositions } from '../redux/modules/widgets.js';

import classnames from 'classnames';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as React from 'react';

import './SaveWidgetPositions.css';

import type { WidgetPositionRecord } from '../models/WidgetPosition.js';

type Props = {|
  saveWidgetPositions: Function,
  active: Immutable.Map<string, WidgetPositionRecord>,
  lastPositionSave: Immutable.Map<string, WidgetPositionRecord>,
|};

class SaveWidgetPositions extends React.Component<Props> {
  hasChangedPositions = (): boolean => {
    const { active, lastPositionSave } = this.props;
    // This doesn't work in flow, but works in Immutable...
    // $FlowFixMe
    return !active.equals(lastPositionSave);
  }

  handleClick = (): void => {
    if (this.hasChangedPositions()) {
      const { saveWidgetPositions, active } = this.props;
      saveWidgetPositions(active.toIndexedSeq());
    }
  }

  render() {
    const hasChangedPositions = this.hasChangedPositions();
    const classes = classnames({
      'btn': true,
      'save-positions': true,
      'save-positions__in-sync': !hasChangedPositions
    });
    return (
      <button className={classes} onClick={this.handleClick}>
        {hasChangedPositions ? 'Save' : 'Synced!'}
      </button>
    );
  }
}

function mapStateToProps({ widgets: { active, lastPositionSave }}) {
  return {
    active,
    lastPositionSave,
  };
}

export default connect(mapStateToProps, { saveWidgetPositions })(SaveWidgetPositions);
