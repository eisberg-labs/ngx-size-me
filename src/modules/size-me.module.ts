import {ModuleWithProviders, NgModule} from '@angular/core';
import {SizeMeDirective} from '../directives/size-me.directive';
import {ResizeDetectorService} from '../services/resize-detector.service';

const COMPONENTS = [SizeMeDirective];
@NgModule({
  imports: [],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [ResizeDetectorService]
})

export class SizeMeModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SizeMeModule,
      providers: [ResizeDetectorService]
    };
  }
}
