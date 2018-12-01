interface timeline {
  type: string;
  now: any;
  sync: Function;
}
//the timeline property `now` means
//time-index of the current time
// on the timeline from now until the future / next - now

const right = (a: any) => (b: any) => b;

const EV = () => ((observers: Function[]) => ({
  register: (f: Function) =>
    (observers[observers.length] = f),
  trigger: (val: any) => right
    (observers.map((f: Function) => f(val)))
    (val)
}))([]);

const T = ((EV) =>
  (timeFunction: Function = () => { }): timeline => {
    //immutable in the frozen universe
    let currentVal: any = undefined;
    const timeline = ((ev) => ({
      type: "timeline-monad",  //for TTX => TX
      get now() { //getter returns a value of now
        return currentVal;
      },
      set now(val) {
        currentVal = val;
        (currentVal === undefined)
          ? undefined
          : ev.trigger(currentVal);
      },
      sync: ((ev) => (f: Function) => {
        const syncTL: timeline = T();
        const todo = (a: undefined) => {
          const newVal: undefined | timeline = f(a);
          // RightIdentity: join = TTX => TX  
          return (newVal !== undefined) &&
            (newVal.type === timeline.type)
            ? newVal.sync((a: undefined) =>
              syncTL.now = a)
            : syncTL.now = newVal
        };
        ev.register(todo);
        timeline.now = timeline.now;
        return syncTL;
      })(ev)
    }))(EV());
    timeFunction(timeline);
    return timeline;
  })(EV);

export { T };