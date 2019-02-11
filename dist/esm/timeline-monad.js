//the timeline property `now` means
//time-index of the current time
// on the timeline from now until the future / next - now
const Events = () => {
    const observers = [];
    return {
        register(observer) {
            observers.push(observer);
        },
        trigger(value) {
            for (const observer of observers) {
                observer(value);
            }
        }
    };
};
const T = (timeFunction = () => { }) => {
    //immutable in the frozen universe
    let currentVal = undefined;
    const timeline = (() => {
        const ev = Events();
        return {
            type: "timeline-monad",
            get now() {
                return currentVal;
            },
            set now(val) {
                currentVal = val;
                (currentVal === undefined)
                    ? undefined
                    : ev.trigger(currentVal);
            },
            sync(f) {
                const syncTL = T();
                const todo = (val) => {
                    const newVal = f(val);
                    // RightIdentity: join = TTX => TX  
                    return (newVal !== undefined) &&
                        (newVal.type === timeline.type)
                        ? newVal.sync((val) => syncTL.now = val)
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
};
export { T };
