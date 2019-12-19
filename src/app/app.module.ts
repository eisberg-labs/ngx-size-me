import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SizeMeModule} from 'projects/ngx-size-me/src/lib/size-me.module';
import {SizeAwareComponent} from './size-aware.component';

@NgModule({
  declarations: [
    AppComponent,
    SizeAwareComponent
  ],
  imports: [
    BrowserModule,
    SizeMeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
