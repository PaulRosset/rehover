# Rehover 👐

#### React hovering on two elements made simpler!

[![Travis CI Build Status](https://travis-ci.org/PaulRosset/rehover.svg?branch=master)](https://travis-ci.org/PaulRosset/rehover)
[![npm version](https://badge.fury.io/js/rehover.svg)](https://badge.fury.io/js/rehover)

![](demo.gif)

## Install

```sh
yarn add rehover
```

## Usage

> React v16.0 required, [rendering arrays in render method.](https://reactjs.org/blog/2017/09/26/react-v16.0.html)

### To build something quickly...

If you don't need to build something very complex, `Rehover` component is what you need, like the example below:

* **Pros**:
  * Easy to get started
  * Very light to write (not verbose)
* **Cons**:
  * Not very customizable
  * Restricted to 2 children only

```js
import React from "react";
import { Rehover } from "rehover";
```

```jsx
<Rehover delay={150}>
  <button source>Hover me!</button>
  <div destination>
    <a href="#">A</a>
    <a href="#">B</a>
    <a href="#">C</a>
  </div>
</Rehover>
```

### To go further...

However, if you want to write something more customizable and complex, you should try the example below, which is using the [**new Context API from React**](https://reactjs.org/docs/context.html).

* **Pros**:
  * You are free to customize, you are not anymore restricted to two childrens.
  * You are using the new context API 🔥
* **Cons**:

  * Much more verbose.
  * Longer to write.

```js
import React from "react";
import { RehoverProvider, RehoverConsumer } from "rehover";
```

```jsx
<RehoverProvider delay={150}>
  <RehoverConsumer>
    {({ states, actions }) => (
      <div>
        <button
          onMouseEnter={actions.onMouseEnterSource}
          onMouseLeave={actions.onMouseLeaveSource}
        >
          Hover me !
        </button>
        {states.isOnSource || states.isOnTarget ? (
          <div>
            <h4>List of items:</h4>
            <div
              onMouseEnter={actions.onMouseEnterTarget}
              onMouseLeave={actions.onMouseLeaveTarget}
            >
              <div>Item1</div>
              <div>Item2</div>
              <div>Item3</div>
            </div>
          </div>
        ) : null}
      </div>
    )}
  </RehoverConsumer>
</RehoverProvider>
```

> The new React context Api is available since the 16.3.0 version.

## API

* Delay: Number `delay`

  * To let you the time to go to the target.

* States: Function `states`
  * Function with `isOpen`, `isOntarget` and `isOnSource` as parameter `Boolean`, to let you construct animation for example.

> If you want to pass a **_React Component_** as a source or destination, make sure that they got a onMouseEnter props and a onMouseLeave props at their root.

## Live demo/Sandbox

[![Edit j2rjln010w](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0o78oxx3w0)

## License

MIT Paul Rosset
