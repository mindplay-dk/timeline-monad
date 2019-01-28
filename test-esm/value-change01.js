import { T } from
    "../dist/esm/timeline-monad.js";

const log = (a) => {
    console.log(a);
    return a;
};

const timelineA = T();
timelineA.now = 1;
log(timelineA.now);//1

const timelineB = timelineA.sync(a => a * 2);
log(timelineB.now);//2

//1 second later, timelineA value is changed to 5
const todo = () => {
    timelineA.now = 5;
    log(timelineA.now);//5
    log(timelineB.now);//10
};
setTimeout(todo, 1000);