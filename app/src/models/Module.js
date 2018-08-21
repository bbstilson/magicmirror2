import { getValueByDividingBy } from './utils.js';

/**
 * @param {string} name - The display name used on the DraggableMirror.
 * @param {string} description - The description of the module used on the ModulePicker.
 * @param {object} size - The ratio sizes for the module. E.g., { width: 2, height: 3 } signifies
 *                 that the module's width should be half the containers width and should be 1/3 the
 *                 height of the container's height. If size contains `square`, then width is set
 *                 to the same ratio as the height.
 * @param {object} custom - Any custom values.
 */

export type ModulePosition = {
  top: number,
  left: number
}

export type ModuleDimension = {
  height: number,
  width?: number,
  square: boolean
}

export type ModuleSize = {
  square: boolean,
  calculateWidthFrom: Function,
  calculateHeightFrom: Function
}

type CustomProps = {
  [string]: any
}

export default class Module {
  name: string;
  description: string;
  landSize: ModuleSize;
  portSize: ModuleSize;
  position: ModulePosition;
  custom: ?CustomProps;

  constructor(
    name: string,
    description: string,
    landSize: ModuleDimension,
    portSize: ModuleDimension,
    custom?: CustomProps
  ) {
    if (!name) {
      this.throwError('name');
    }
    if (!description) {
      this.throwError('description');
    }
    if (!landSize) {
      this.throwError('landSize');
    }
    if (!portSize) {
      this.throwError('portSize');
    }

    this.name = name;
    this.description = description;
    this.landSize = this.setSize(landSize);
    this.portSize = this.setSize(portSize);
    this.position = this.initPosition();
    this.custom = custom;
  }

  /**
   * Modules start off at (0, 0) when added to Live View.
   */
  initPosition(): ModulePosition {
    return { top: 0, left: 0 };
  }

  /**
   * Updates the modules position.
   *
   * @param {object} The new coordinates.
   * @returm {this} Returns itself so it can be added back into the redux store.
   */
  updatePosition(newPosition: ModulePosition): Module {
    this.position = newPosition;
    return this;
  }

  setSize({ width, height, square }: ModuleDimension): ModuleSize {
    return {
      square,
      calculateWidthFrom: getValueByDividingBy(width || 0),
      calculateHeightFrom: getValueByDividingBy(height)
    };
  }

  throwError(prop: string) {
    throw new Error(`Property "${prop}" was not declared in Module constructor.`);
  }
}
