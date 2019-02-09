//event observers
const right = (a) => (b) => b;
const Events = () => ((observers) => ({
  register: (f) => (observers[observers.length] = f),
  trigger: (val) => right(observers.map((f) => f(val)))(val)
}))([]);

//timeline factory function
const T = ((Events) => (timeFunction = () => { }) => {
  //immutable in the frozen universe
  let currentVal = undefined;
  const timeline = ((ev) => ({
    type: "timeline-monad",
    get now() {
      return currentVal;
    },
    set now(val) {
      currentVal = val;
      (currentVal === undefined)
        ? undefined
        : ev.trigger(currentVal);
    },//sync is "flatMap"
    sync: ((ev) => (f) => {
      const syncTL = T();
      const todo = (val) => {
        const newVal = f(val);
        // RightIdentity: flat = TTX => TX  
        return (newVal !== undefined) &&
          (newVal.type === timeline.type)
          ? newVal.sync((val) => syncTL.now = val)
          : syncTL.now = newVal;
      };
      ev.register(todo);
      timeline.now = timeline.now;
      return syncTL;
    })(ev)
  }))(Events());
  timeFunction(timeline);
  return timeline;
})(Events);

//"unit" function == instant fill of timeline value
const timelineOf = (a) =>
  T(self => (self.now = a));

const testMonadLaws = a => f => g => {
  // left & right identity
  const timelineLeft =
    timelineOf(a).sync(f);

  const timelineCenter = f(a);

  const timelineRight =
    f(a).sync(timelineOf)

  // associativity
  const timelineAssociativity1 =
    timelineOf(a)
      .sync(f)
      .sync(g);

  const timelineAssociativity2 =
    timelineOf(a)
      .sync(b =>
        timelineOf(b)
          .sync(f)
          .sync(g));

  //timeline monad value viewer
  const str = timeline =>
    timeline.now.type === undefined
      ? timeline.now
      : "timelineOf(" + timeline.now.now + ")";

  console.log("===Monad Laws Test===");
  console.log("---left&right identity");
  console.log(str(timelineLeft));
  console.log(str(timelineCenter));
  console.log(str(timelineRight));
  console.log("---associativity");
  console.log(str(timelineAssociativity1));
  console.log(str(timelineAssociativity2));

};
const compose = f => g => (a => g(f(a)));

const f = a => a * 2;
const g = a => a + 1;

{//the value is naked number
  const a = 1;
  //monad functions
  const fMonadic = compose(f)(timelineOf);
  const gMonadic = compose(g)(timelineOf);

  testMonadLaws(a)(fMonadic)(gMonadic);
}

{//the value is monad
  const a = timelineOf(5);

  const fMonadic = compose
    (a => a.sync(f))
    (timelineOf);

  const gMonadic = compose
    (a => a.sync(g))
    (timelineOf);

  testMonadLaws(a)(fMonadic)(gMonadic);
}

