[![Downloads](http://img.shields.io/npm/dm/ngx-size-me.svg)](https://npmjs.org/package/ngx-size-me)
![Build status](https://github.com/eisberg-labs/ngx-size-me/actions/workflows/ci.yml/badge.svg)
# [ngx-size-me](https://github.com/eisberg-labs/ngx-size-me)
>Responsive component for Angular, inspired by [react-size-me](https://github.com/ctrlplusb/react-size-me).


Lightweight angular directive that makes your components aware of width, height and position.
![Example](docs/thumbnail.png)
If you 👍 this project, consider giving it a ★, thanks! 🙌
# Install

```javascript
npm install ngx-size-me --save

```
# Usage
First import to your module:
```typescript
   @NgModule({
     declarations: [
       AppComponent
     ],
     imports: [
       BrowserModule,
       SizeMeModule
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }

```
And use in your component html
```typescript
<div sizeMe (resize)="logResize($event)"></div>

```
## Options
Option | Data type | Description
-------|-----------|------------
**monitorWidth** | number | if true, any changes to your component's width will trigger a recalculation
**monitorHeight** | boolean | if true, any changes to your component's height will trigger a recalculation
**refreshRate** | number | Frequency of detecting element changes (milliseconds). Default is 16ms.
**refreshMode** | 'throttle' or 'debounce' | Mode in which refreshing should occur.

When recalculation is triggered, directive's state is updated with new width, height and position (left, right, top, bottom).
When a state is updated, component can be notified either by binding an event trigger like:
```typescript
<div sizeMe (resize)="logResize($event)"></div>

```
or by binding updates to a property:
```typescript
<div sizeMe [state]="size"></div>
```

# Demo

[Try the Demo in StackBlitz](https://stackblitz.com/edit/ngx-size-me-demo)

## License

MIT © [Eisberg Labs](https://www.eisberg-labs.com)


[npm-image]: https://badge.fury.io/js/ngx-size-me.svg
[npm-url]: https://npmjs.org/package/ngx-size-me
[travis-image]: https://travis-ci.com/eisberg-labs/ngx-size-me.svg?branch=develop
[travis-url]: https://travis-ci.com/eisberg-labs/ngx-size-me?branch=develop
[daviddm-image]: https://david-dm.org/eisberg-labs/ngx-size-me.svg?theme=shields.io&path=projects/ngx-size-me
[daviddm-url]: https://david-dm.org/eisberg-labs/ngx-size-me?path=projects/ngx-size-me
