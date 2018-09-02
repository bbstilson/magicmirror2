import { getValueByDividingBy } from './utils.js';

/**
 * @param {string} name - The display name used on the DraggableMirror.
 * @param {string} description - The description of the widget used on the WidgetPicker.
 * @param {object} size - The ratio sizes for the widget. E.g., { width: 2, height: 3 } signifies
 *                 that the widget's width should be half the containers width and should be 1/3 the
 *                 height of the container's height. If size contains `square`, then width is set
 *                 to the same ratio as the height.
 * @param {object} custom - Any custom values.
 */

export type WidgetPosition = {|
  top: number,
  left: number
|};

export type WidgetDimension = {|
  height: number,
  width?: number,
  square: boolean
|};

export type WidgetSize = {|
  square: boolean,
  calculateWidthFrom: Function,
  calculateHeightFrom: Function
|};

type CustomProps = {|
  [string]: any
|};

export default class Widget {
  name: string;
  description: string;
  size: WidgetSize;
  position: WidgetPosition;
  custom: ?CustomProps;

  constructor(
    name: string,
    description: string,
    size: WidgetDimension,
    custom?: CustomProps
  ) {
    if (!name) {
      this.throwError('name');
    }
    if (!description) {
      this.throwError('description');
    }
    if (!size) {
      this.throwError('size');
    }

    this.name = name;
    this.description = description;
    this.size = this.setSize(size);
    this.position = this.initPosition();
    this.custom = custom;
  }

  /**
   * Widgets start off at (0, 0) when added to Live View.
   */
  initPosition(): WidgetPosition {
    return { top: 0, left: 0 };
  }

  /**
   * Updates the widget's position.
   *
   * @param {object} The new coordinates.
   * @returm {this} Returns itself so it can be added back into the redux store.
   */
  updatePosition(newPosition: WidgetPosition): Widget {
    this.position = newPosition;
    return this;
  }

  getPosition() {
    return this.position;
  }

  setSize({ width, height, square }: WidgetDimension): WidgetSize {
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
