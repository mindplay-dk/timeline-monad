
import { T } from
  "../build/modules/timeline-monad";
import { allThenResetTL } from "../build/modules/allThenResetTL";

console.log("all");
// timeline definitions-----
const consoleTL = ((console) => T(
  (self) => self.sync((a) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a) => (consoleTL.now = a)
const timelineA = T();
const timelineB = timelineA.sync(a => a * 2);
//log on every tinmeline Atomic update


// -----timeline definitions
timelineA.sync(log);
timelineB.sync(log);
allThenResetTL([timelineA, timelineB]).sync(log);
{// set the currentvalues-----
  timelineA.now = 1;


}


