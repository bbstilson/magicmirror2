import SaveWidgetPositions from '../../components/SaveWidgetPositions.js';
import Widget from '../../components/widget/Widget.js';

import { connect } from 'react-redux';
import Loading from 'react-simple-loading';
import * as React from 'react';

import './WidgetPicker.css';

import type { AppState } from '../../redux/modules/index.js';
import type { PositionsType } from '../../redux/modules/widgets.js';

type Props = {|
  positions: PositionsType,
  isFetching: boolean,
  fetchError: boolean,
|};

class WidgetPicker extends React.Component<Props> {
  render() {
    const { positions, isFetching, fetchError } = this.props;

    if (isFetching) {
      return <Loading color="#000" stroke="2px" />;
    }

    if (fetchError) {
      return (
        <div>Fetch error :/</div>
      )
    }

    return (
      <div className="widget-picker flex--column--center">
        <div className="full-width">
          {positions
            .valueSeq()
            .map(({ widget }) => <Widget key={widget.id} widget={widget} />)}
          <SaveWidgetPositions />
        </div>
      </div>
    );
  }
}

function mapStateToProps ({
  widgets: { positions },
  fetchWidgets: { isFetching, fetchError }
}: AppState) {
  return {
    positions,
    isFetching,
    fetchError,
  };
}

export default connect(mapStateToProps)(WidgetPicker);
