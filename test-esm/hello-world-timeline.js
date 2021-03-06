import { T } from
  "../dist/esm/timeline-monad.js";

const log = a => {
  console.log(a);
  return a;
};
const timeline = T();

timeline.now = "Hello";

const timeline2 = timeline
  .sync(msg => log(msg));

{//another code block, another time
  timeline.now = "world";
}