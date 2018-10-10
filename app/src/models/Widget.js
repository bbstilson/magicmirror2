import { getValueByDividingBy } from './utils.js';

import WidgetDimension from './WidgetDimension.js';

export type WidgetSize = {|
  square: boolean,
  calculateWidthFrom: Function,
  calculateHeightFrom: Function
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

  constructor({
    name, 
    description,
    size,
    custom
  }: {
    name: string,
    description: string,
    size: WidgetDimension
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
  }

  static empty() {
    return new Widget({ name: '', description: '', size: WidgetDimension() });
  }

  setSize(size: WidgetDimension): WidgetSize {
    const { width, height } = size;

    return {
      calculateWidthFrom: getValueByDividingBy(width),
      calculateHeightFrom: getValueByDividingBy(height)
    };
  }

  throwError(prop: string) {
    throw new Error(`Property "${prop}" was not declared in Widget constructor.`);
  }
}
