import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SizeMeDim, SizeMeDirective} from './size-me.directive';
import {ResizeDetectorService} from '../services/resize-detector.service';

@Component({
  template: `
    <div style='background: blue' [refreshRate]='100' sizeMe (resize)='logResize($event)'><h2></h2></div>`
})
class TestSizeAwareComponent {
  logResize(event: SizeMeDim) {
    console.log('Resize event', event);
  }
}

describe('Directive: SizeMeDirective', () => {
  let component: TestSizeAwareComponent;
  let fixture: ComponentFixture<TestSizeAwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResizeDetectorService],
      declarations: [SizeMeDirective, TestSizeAwareComponent]
    });
    fixture = TestBed.createComponent(TestSizeAwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger logResize if screen width changes', () => {
    fixture.whenStable().then(() => {
      spyOn(component, 'logResize');
      const prevWidth = fixture.debugElement.nativeElement.width;
      fixture.debugElement.nativeElement.width = '1000px';
      expect(component.logResize).toHaveBeenCalledTimes(1);
      expect(component.logResize).toHaveBeenCalledWith(
        {width: prevWidth + 1000, height: undefined, position: undefined}
      );
    });
  });
});
