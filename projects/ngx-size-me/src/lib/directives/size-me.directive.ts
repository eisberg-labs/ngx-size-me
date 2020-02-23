import {AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ResizeDetectorService, ResizeStrategyType} from '../services/resize-detector.service';
import {interval, Subject} from 'rxjs';
import {debounce, throttle} from 'rxjs/operators';

export type StrategyType = 'callback' | 'render';

export type RefreshModeType = 'throttle' | 'debounce';

export interface SizeMeDim {
  width?: number;
  height?: number;
  position?: { right: number, left: number, top: number, bottom: number };
}

@Directive({
  selector: '[sizeMe]'
})
export class SizeMeDirective implements AfterContentInit, OnDestroy {
  @Input() state: SizeMeDim;
  @Input() monitorWidth = true;
  @Input() monitorHeight = false;
  @Input() monitorPosition = false;
  @Input() refreshRate = 16;
  @Input() refreshMode: RefreshModeType = 'throttle';
  @Input() resizeDetectorStrategy: ResizeStrategyType = 'scroll';
  detector: any;
  @Output()
  resize = new EventEmitter<SizeMeDim>();
  callbackState: SizeMeDim;
  strategy: StrategyType;
  domEl: any;
  private changeSubject = new Subject<HTMLElement>();

  strategizedSetState(state: SizeMeDim) {
    if (this.strategy === 'callback') {
      this.callbackState = state;
      this.resize.emit(state);
    }
    Object.assign(this.state, state);
  }

  strategizedGetState() {
    return this.strategy === 'callback' ? this.callbackState : this.state;
  }

  hasSizeChanged(current: any, next: any) {
    const c = current;
    const n = next;
    const cp = c.position || {};
    const np = n.position || {};
    return (
      (this.monitorHeight && c.height !== n.height) ||
      (this.monitorPosition &&
        (cp.top !== np.top ||
          cp.left !== np.left ||
          cp.bottom !== np.bottom ||
          cp.right !== np.right)) ||
      (this.monitorWidth && c.width !== n.width)
    );
  }

  checkIfSizeChanged(el: HTMLElement) {
    if (el == null) {
      return;
    }

    const {
      width,
      height,
      right,
      left,
      top,
      bottom,
    } = el.getBoundingClientRect();

    const next: SizeMeDim = {
      width: this.monitorWidth ? width : undefined,
      height: this.monitorHeight ? height : undefined,
      position: this.monitorPosition ? {right, left, top, bottom} : undefined,
    };

    if (this.hasSizeChanged(this.strategizedGetState(), next)) {
      this.strategizedSetState(next);
    }
  }

  constructor(public el: ElementRef, private resizeDetector: ResizeDetectorService) {
    this.checkIfSizeChanged = this.checkIfSizeChanged.bind(this);
    this.hasSizeChanged = this.hasSizeChanged.bind(this);
    this.strategizedSetState = this.strategizedSetState.bind(this);
    this.strategizedGetState = this.strategizedGetState.bind(this);
    const refreshDelayStrategy = (
      this.refreshMode === 'throttle'
        ? this.changeSubject.pipe(throttle(() => interval(this.refreshRate)))
        : this.changeSubject.pipe(debounce(() => interval(this.refreshRate)))
    );
    refreshDelayStrategy.subscribe((elem) => this.checkIfSizeChanged(elem));
  }

  ngAfterContentInit(): void {
    this.detector = this.resizeDetector.getDetector(this.resizeDetectorStrategy);
    this.determineStrategy();
    this.handleDOMNode();
  }

  ngOnDestroy(): void {
    if (this.detector) {
      this.detector.uninstall(this.el.nativeElement);
    }
  }

  determineStrategy() {
    if (this.resize.observers.length > 0) {
      if (!this.callbackState) {
        this.callbackState = {
          ...this.state,
        };
      }
      this.strategy = 'callback';
    } else {
      this.strategy = 'render';
    }
  }

  handleDOMNode() {
    const found = this.el.nativeElement;
    if (!found) {
      // This is for special cases where the element may be null.
      if (this.domEl) {
        this.detector.uninstall(this.el.nativeElement);
        this.domEl = undefined;
      }
      return;
    }

    if (this.domEl) {
      this.detector.uninstall(this.domEl);
    }

    this.domEl = found;
    this.detector.listenTo(this.domEl, (el) => this.changeSubject.next(el));
  }
}
