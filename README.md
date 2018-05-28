# [ngx-size-me](https://github.com/eisberg-labs/ngx-size-me)
[![Build Status](https://travis-ci.org/eisberg-labs/ngx-size-me.svg?branch=master)](https://travis-ci.org/eisberg-labs/ngx-size-me)
>Responsive component for Angular, inspired by [react-size-me](https://github.com/ctrlplusb/react-size-me).


Lightweight angular directive that makes your components aware of width, height and position.

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
       SizeMeModule.forRoot()
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
Some of the available input options are:
- **monitorWidth** - boolean - if true, any changes to your component's width will trigger a recalculation
- **monitorHeight** - boolean - if true, any changes to your component's height will trigger a recalculation
- **refreshRate** - number - Frequency of detecting element changes (milliseconds). Default is 16ms.
- **refreshMode** - 'throttle' | 'debounce' - Mode in which refreshing should occur.
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
MIT

