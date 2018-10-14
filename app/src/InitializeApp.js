import { fetchWidgetPositions } from './redux/modules/fetch_widgets.js';

import { connect } from 'react-redux';
import * as React from 'react';

type Props = {|
  fetchWidgetPositions: Function
|};

class InitializeApp extends React.Component<Props> {
  componentWillMount = () => {
    this.props.fetchWidgetPositions();
  }
  
  render() {
    return null;
  }
}

 export default connect(() => ({}), { fetchWidgetPositions })(InitializeApp);
