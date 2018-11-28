
import { T, now } from
  "../dist/build/modules/timeline-monad";

const timeline = T();

timeline[now] = "Hello world";

console.log(timeline[now]);
