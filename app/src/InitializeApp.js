import { fetchWidgetPositions } from './redux/modules/fetch_widgets.js';
import { getCoordinates } from './redux/modules/weather.js';

import { connect } from 'react-redux';
import * as React from 'react';

type Props = {|
  fetchWidgetPositions: () => Function,
  getCoordinates: () => Function,
|};

class InitializeApp extends React.Component<Props> {
  componentWillMount = () => {
    const { fetchWidgetPositions, getCoordinates } = this.props;

    fetchWidgetPositions();
    getCoordinates();
  }
  
  render() {
    return null;
  }
}

const mapDispatchToProps = {
  fetchWidgetPositions,
  getCoordinates,
};

 export default connect(() => ({}), mapDispatchToProps)(InitializeApp);
