import { Component, Input, ViewChild } from "@angular/core";
import { SizeMeDirective } from "@eisberg-labs/ngx-size-me";

@Component({
  selector: "app-size-aware",
  template: `
    <div
      sizeMe
      [monitorHeight]="true"
      [state]="size"
      [style.height]="height"
      [style.background-color]="color"
    >
      <span>{{ size.width }}x{{ size.height }}</span>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        font-weight: bold;
        position: relative;
        text-align: center;
      }

      span {
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    `
  ]
})
export class SizeAwareComponent {
  size: any = {};
  @Input() height: string = "";
  @Input() color: string = "";
  @ViewChild(SizeMeDirective) dir: SizeMeDirective | undefined = undefined;
}
