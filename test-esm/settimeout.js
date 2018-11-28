
import { T, now } from
  "../dist/build/modules/timeline-monad";

const f = () => (console.log("hello"));
setTimeout(f, 1000);

//timeline version
const oneSecDelayTL = T(
  self => {
    const f = () => (self[now] = "hello");
    setTimeout(f, 1000);
  }
);

const nouseTL = oneSecDelayTL
  .sync(
    (msg) => (console.log(msg) || msg)
  );

