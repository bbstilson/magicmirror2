import Immutable from 'immutable';

type WidgetDimensionProps = {|
  height: number,
  width: number,
|};

const WidgetDimensionDefaultProps: WidgetDimensionProps = {
  height: 0,
  width: 0,
};

export type WidgetDimensionRecord = Immutable.Record<WidgetDimensionProps> & WidgetDimensionProps;

export default Immutable.Record(WidgetDimensionDefaultProps);
