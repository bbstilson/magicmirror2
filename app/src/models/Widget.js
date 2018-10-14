import { getValueByDividingBy } from './utils.js';

import WidgetDimension from './WidgetDimension.js';

export type WidgetSize = {|
  calculateWidth: Function,
  calculateHeight: Function
|};

export type RawWidgetPosition = {
  id: number,
  name: string,
  description: string,
  width: number,
  height: number,
  top: number,
  left: number,
  active: boolean,
};

/**
 * @param {string} name - The display name used on the DraggableMirror.
 * @param {string} description - The description of the widget used on the WidgetPicker.
 * @param {object} size - The ratio sizes for the widget. E.g., { width: 2, height: 3 } signifies
 *                 that the widget's width should be half the containers width and should be 1/3 the
 *                 height of the container's height. If size contains `square`, then width is set
 *                 to the same ratio as the he
 */
export default class Widget {

  id: number;
  name: string;
  description: string;
  size: WidgetSize;

  fromDbRow: (row: RawWidgetPosition) => Widget;

  constructor({
    id,
    name,
    description,
    size,
  }: {
    id: number,
    name: string,
    description: string,
    size: WidgetDimension
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.size = this.setSize(size);
  }

  static empty() {
    return new Widget({
      id: -1,
      name: '',
      description: '',
      size: WidgetDimension()
    });
  }

  setSize(size: WidgetDimension): WidgetSize {
    const { width, height } = size;

    return {
      calculateWidth: getValueByDividingBy(width),
      calculateHeight: getValueByDividingBy(height)
    };
  }

  static fromDbRow(row: RawWidgetPosition) {
    return new Widget({
      id: row.id,
      name: row.name,
      description: row.description,
      size: WidgetDimension({
        height: row.height,
        width: row.width
      })
    });
  }
}
