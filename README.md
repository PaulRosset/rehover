# Rehover 👐

#### React hovering on two elements made simpler!

## Install

```sh
yarn add rehover
```

## Usage

```js
import React from "react";
import Rehover from "rehover";
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

## API

* Delay: Number `delay`

  * To let you the time to go to the target.

* States: Function `states`
  * Function with `isOpen`, `isOntarget` and `isOnSource` as parameter `Boolean`, to let you construct animation for example.

## Live demo/Sandbox

[![Edit j2rjln010w](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0o78oxx3w0)

## License

MIT Paul Rosset
