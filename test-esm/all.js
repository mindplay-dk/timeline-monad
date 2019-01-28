import { T } from
  "../dist/esm/timeline-monad.js";
import { allThenResetTL } from "../dist/esm/allThenResetTL";

const timelineA = T();
const timelineB = timelineA.sync(a => a * 2);

const log = msg => console.log(msg);

//log on every timeline Atomic update
const timelineAB =
  allThenResetTL([timelineA, timelineB]).sync(log);

{// set the current values-----
  timelineA.now = "Hello";
}


