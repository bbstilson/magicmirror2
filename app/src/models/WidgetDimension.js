import Immutable from 'immutable';

type WidgetDimensionProps = {|
  height: number,
  width?: number,
  square: boolean
|};

const WidgetDimensionDefaultProps: WidgetDimensionProps = {
  height: 0,
  width: 0,
  square: false
};

export type WidgetDimensionRecord = Immutable.Record<WidgetDimensionProps> & WidgetDimensionProps;

export default Immutable.Record(WidgetDimensionDefaultProps);
