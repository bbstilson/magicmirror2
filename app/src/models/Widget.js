import { getValueByDividingBy } from './utils.js';

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

export const WidgetDimension = Immutable.Record(WidgetDimensionDefaultProps);

export type WidgetSize = {|
  square: boolean,
  calculateWidthFrom: Function,
  calculateHeightFrom: Function
|};

type CustomProps = {|
  [string]: any
|};

/**
 * @param {string} name - The display name used on the DraggableMirror.
 * @param {string} description - The description of the widget used on the WidgetPicker.
 * @param {object} size - The ratio sizes for the widget. E.g., { width: 2, height: 3 } signifies
 *                 that the widget's width should be half the containers width and should be 1/3 the
 *                 height of the container's height. If size contains `square`, then width is set
 *                 to the same ratio as the height.
 * @param {object} custom - Any custom values.
 */
export default class Widget {

  name: string;
  description: string;
  size: WidgetSize;
  custom: ?CustomProps;

  constructor({
    name, 
    description,
    size,
    custom
  }: {
    name: string,
    description: string,
    size: WidgetDimensionRecord,
    custom?: CustomProps
  }) {
    if (name === undefined) {
      this.throwError('name');
    }
    if (description === undefined) {
      this.throwError('description');
    }
    if (size === undefined) {
      this.throwError('size');
    }

    this.name = name;
    this.description = description;
    this.size = this.setSize(size);
    this.custom = custom;
  }

  static empty() {
    return new Widget({ name: '', description: '', size: WidgetDimension() });
  }

  setSize({ width, height, square }: WidgetDimensionRecord): WidgetSize {
    return {
      square,
      calculateWidthFrom: getValueByDividingBy(width || 0),
      calculateHeightFrom: getValueByDividingBy(height)
    };
  }

  throwError(prop: string) {
    throw new Error(`Property "${prop}" was not declared in Widget constructor.`);
  }
}
