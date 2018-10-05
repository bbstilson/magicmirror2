import Immutable from 'immutable';

export type PositionProps = {|
  top: number,
  left: number
|};

const defaultProps: PositionProps = {
  top: 0,
  left: 0
};

export type PositionRecord = Immutable.Record<PositionProps> & PositionProps;

export default Immutable.Record(defaultProps);
