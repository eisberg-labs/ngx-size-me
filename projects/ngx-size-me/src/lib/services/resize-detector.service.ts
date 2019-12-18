import {Injectable} from '@angular/core';
import elementResizeDetectorMaker from 'element-resize-detector';

export type ResizeStrategyType = 'scroll' | 'object';

/**
 * Handles element resize detector instances.
 * More info on [element-resize-detector]{@link https://github.com/wnr/element-resize-detector}.
 */
@Injectable({providedIn: 'root'})
export class ResizeDetectorService {
  private _instances: { [key: string]: elementResizeDetectorMaker.Erd } = {};

  /**
   * Returns instance of element resize detector.
   * @param strategy scroll-based('scroll') or object-based('object') strategy
   */
  getDetector(strategy: ResizeStrategyType = 'scroll'): elementResizeDetectorMaker.Erd {
    strategy = strategy || 'scroll';
    if (!this._instances[strategy]) {
      this._cacheErd(strategy);
    }

    return this._instances[strategy];
  }

  _cacheErd(strategy: ResizeStrategyType) {
    this._instances[strategy] = elementResizeDetectorMaker({strategy});
  }
}
