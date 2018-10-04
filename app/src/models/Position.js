import Immutable from 'immutable';

const defaultProps: PositionProps = {
  top: 0,
  left: 0
};

export type PositionProps = {|
  top: number,
  left: number
|};

export type PositionRecord = Immutable.Record<PositionProps> & PositionProps;

export default Immutable.Record(defaultProps);
