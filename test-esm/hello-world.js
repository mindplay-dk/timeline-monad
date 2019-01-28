import { T } from
  "../dist/esm/timeline-monad.js";

const timeline = T();

timeline.now = "Hello world";

console.log(timeline.now);
