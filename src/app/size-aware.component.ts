import {Component, Input, ViewChild} from '@angular/core';
import {SizeMeDirective} from 'projects/ngx-size-me/src/lib/directives/size-me.directive';

@Component({
  selector: 'app-size-aware',
  templateUrl: './size-aware.component.html',
  styleUrls: ['./size-aware.component.css']
})
export class SizeAwareComponent {
  size: any = {};
  @Input() height;
  @Input() color;
  @ViewChild(SizeMeDirective) dir: SizeMeDirective;
}
