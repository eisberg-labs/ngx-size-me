import { AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ResizeDetectorService, ResizeStrategyType } from '../services/resize-detector.service';
import { interval, Subject } from 'rxjs';
import { debounce, throttle } from 'rxjs/operators';
import elementResizeDetectorMaker from 'element-resize-detector';

export type StrategyType = 'callback' | 'render';

export type RefreshModeType = 'throttle' | 'debounce';

export interface SizeMePosition {
  right: number;
  left: number;
  top: number;
  bottom: number;
}
export interface SizeMeDim {
  width?: number;
  height?: number;
  position?: SizeMePosition;
}

@Directive({
  selector: '[sizeMe]',
})
export class SizeMeDirective implements AfterContentInit, OnDestroy {
  @Input() state: SizeMeDim;
  @Input() monitorWidth = true;
  @Input() monitorHeight = false;
  @Input() monitorPosition = false;
  @Input() refreshRate = 16;
  @Input() refreshMode: RefreshModeType = 'throttle';
  @Input() resizeDetectorStrategy: ResizeStrategyType = 'scroll';
  detector: elementResizeDetectorMaker.Erd;
  @Output()
  resize = new EventEmitter<SizeMeDim>();
  callbackState: SizeMeDim;
  strategy: StrategyType;
  domEl?: HTMLElement;
  private changeSubject = new Subject<HTMLElement>();

  strategizedSetState(state: SizeMeDim) {
    if (!this.state) {
      this.state = {
        width: undefined,
        height: undefined,
        position: undefined,
      };
    }
    if (this.strategy === 'callback' && state) {
      this.callbackState = state;
      this.resize.emit(state);
    }
    Object.assign(this.state, state);
  }

  strategizedGetState() {
    return this.strategy === 'callback' ? this.callbackState : this.state;
  }

  hasSizeChanged(current: SizeMeDim, next: SizeMeDim) {
    const c = current;
    const n = next;
    const cp: SizeMePosition | undefined = c.position;
    const np: SizeMePosition | undefined = n.position;
    return (
      (this.monitorHeight && c.height !== n.height) ||
      (this.monitorPosition &&
        (cp?.top !== np?.top || cp?.left !== np?.left || cp?.bottom !== np?.bottom || cp?.right !== np?.right)) ||
      (this.monitorWidth && c.width !== n.width)
    );
  }

  checkIfSizeChanged(el: HTMLElement) {
    if (el == null) {
      return;
    }

    const { width, height, right, left, top, bottom } = el.getBoundingClientRect();

    const next: SizeMeDim = {
      width: this.monitorWidth ? width : undefined,
      height: this.monitorHeight ? height : undefined,
      position: this.monitorPosition ? { right, left, top, bottom } : undefined,
    };

    if (next && this.hasSizeChanged(this.strategizedGetState(), next)) {
      this.strategizedSetState(next);
    }
  }

  constructor(public el: ElementRef, private resizeDetector: ResizeDetectorService) {
    this.checkIfSizeChanged = this.checkIfSizeChanged.bind(this);
    this.hasSizeChanged = this.hasSizeChanged.bind(this);
    this.strategizedSetState = this.strategizedSetState.bind(this);
    this.strategizedGetState = this.strategizedGetState.bind(this);
    const refreshDelayStrategy =
      this.refreshMode === 'throttle'
        ? this.changeSubject.pipe(throttle(() => interval(this.refreshRate)))
        : this.changeSubject.pipe(debounce(() => interval(this.refreshRate)));
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
    this.changeSubject.unsubscribe();
    this.resize.unsubscribe();
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
    const nativeElement = this.el.nativeElement;

    // Uninstall detector if domEl is defined
    if (this.domEl) {
      this.detector.uninstall(this.domEl);
      this.domEl = undefined;
    }
    if (nativeElement) {
      // nativeElement should not be null
      this.domEl = nativeElement;
      const changeCallback = (el: HTMLElement) => {
        this.changeSubject.next(el);
      };
      if (this.domEl) {
        // this branch due to typescript type warning
        this.detector.listenTo(this.domEl, changeCallback);
      }
    }
  }
}
