import { T } from
    "../dist/esm/timeline-monad.js";

// timeline definitions-----
const consoleTL = ((console) => T(
    (self) => self.sync((a) => {
        console.log(a);
        return a;
    })
))(console);
const log = (a) => (consoleTL.now = a);
const timelineA = T();
const timelineB = timelineA.sync(a => a * 2);
//log on every tinmeline update
const logATL = timelineA.sync(log);
const logBTL = timelineB.sync(log);
//1 second later, timelineA value is changed to 5
const delayTL = T(
    (self) => self//delayTL.now= true 
        .sync((a) => {// will trigger .sync()
            consoleTL.now = "delay triggered...";
            const todo = () => (timelineA.now = 5);
            setTimeout(todo, 1000);
            return true;
        })
);
// -----timeline definitions

{// set the currentvalues-----
    timelineA.now = 1;
    delayTL.now = true;//trigger delay
}

