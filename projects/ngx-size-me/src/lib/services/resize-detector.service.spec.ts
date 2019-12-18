import {ResizeDetectorService} from './resize-detector.service';

describe('ResizeDetectorService', () => {

  it('#getDetector should return default strategy if nothing provided', () => {
    const resizeDetectorService = new ResizeDetectorService();
    const detector = resizeDetectorService.getDetector('scroll');
    expect(detector).toBeDefined();
    expect(detector.hasOwnProperty('listenTo')).toBe(true);
    expect(detector.hasOwnProperty('removeAllListeners')).toBe(true);
    expect(detector.hasOwnProperty('removeListener')).toBe(true);
    expect(detector.hasOwnProperty('uninstall')).toBe(true);
  });

  it('#getDetector should return strategy if scroll', () => {
    const resizeDetectorService = new ResizeDetectorService();
    const detector = resizeDetectorService.getDetector('scroll');
    expect(detector).toBeDefined();
    expect(detector.hasOwnProperty('listenTo')).toBe(true);
    expect(detector.hasOwnProperty('removeAllListeners')).toBe(true);
    expect(detector.hasOwnProperty('removeListener')).toBe(true);
    expect(detector.hasOwnProperty('uninstall')).toBe(true);
  });

  it('#getDetector should return cached strategy', () => {
    const resizeDetectorService = new ResizeDetectorService();
    spyOn(resizeDetectorService, '_cacheErd').and.callThrough();
    const detector = resizeDetectorService.getDetector('object');
    expect(detector).toBeDefined();
    expect(detector.hasOwnProperty('listenTo')).toBe(true);
    expect(detector.hasOwnProperty('removeAllListeners')).toBe(true);
    expect(detector.hasOwnProperty('removeListener')).toBe(true);
    expect(detector.hasOwnProperty('uninstall')).toBe(true);

    const detector2 = resizeDetectorService.getDetector('object');
    expect(detector2).toEqual(detector);
    expect(resizeDetectorService._cacheErd).toHaveBeenCalledTimes(1);
    expect(resizeDetectorService._cacheErd).toHaveBeenCalledWith('object');
  });
});
