# timeline-monad

[![Build Status](https://travis-ci.org/stken2050/timeline-monad.svg?branch=master)](https://travis-ci.org/stken2050/timeline-monad)


## ES Module (ESM)

Just use:

https://github.com/stken2050/timeline-monad/blob/master/dist/esm/timeline-monad.js

```js 
        import { T } from "./dist/esm/timeline-monad.js";
        const timeline = T();
```

## Node (Common JS)

https://www.npmjs.com/package/timeline-monad

>npm i timeline-monad

```js 
        const { T } = require("timeline-monad");
        const timeline = T();
```

## Browser (CDN)

```html
    <script src="https://unpkg.com/timeline-monad/dist/umd/timeline-monad.js"></script>

    <script>
        const T = window["timeline-monad"].T;
        const timeline = T();
    </script>
```

