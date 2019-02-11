interface timeline {
  type: string;
  now: any;
  sync: Function;
}
//the timeline property `now` means
//time-index of the current time
// on the timeline from now until the future / next - now

const Events = () => {
  const observers: Function[] = [];

  return {
    register(observer: Function) {
      observers.push(observer);
    },
    trigger(value: any) {
      for (const observer of observers) {
        observer(value);
      }
    }
  }
};

const T = (() =>
  (timeFunction: Function = () => { }): timeline => {
    //immutable in the frozen universe
    let currentVal: any = undefined;
    const timeline = (() => {
      const ev = Events();

      return {
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
        sync(f: Function) {
          const syncTL: timeline = T();
          const todo = (val: unknown) => {
            const newVal: undefined | timeline = f(val);
            // RightIdentity: join = TTX => TX  
            return (newVal !== undefined) &&
              (newVal.type === timeline.type)
              ? newVal.sync((val: unknown) =>
                syncTL.now = val)
              : syncTL.now = newVal;
          };
          ev.register(todo);
          timeline.now = timeline.now;
          return syncTL;
        }
      };
    })();
    timeFunction(timeline);
    return timeline;
  })();

export { T };