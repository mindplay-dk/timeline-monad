(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['timeline-monad'] = {}));
}(this, function (exports) { 'use strict';

    //the timeline property `now` means
    //time-index of the current time
    // on the timeline from now until the future / next - now
    const right = (a) => (b) => b;
    const Events = () => ((observers) => ({
        register: (f) => (observers[observers.length] = f),
        trigger: (val) => right(observers.map((f) => f(val)))(val)
    }))([]);
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
            },
            sync: ((ev) => (f) => {
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
            })(ev)
        }))(Events());
        timeFunction(timeline);
        return timeline;
    })(Events);

    const right$1 = (a) => (b) => b;
    const replace = (arr) => (index) => (val) => [...arr.slice(0, index), val,
        ...arr.slice(index + 1)];
    const updateFlagsTL = (TLs) => (selfAll) => T((self) => {
        self.now = Array(TLs.length).fill(0);
        TLs
            .map((TL, index1) => TL.sync(() => right$1(TLs.map((tl, index0) => (tl.now === undefined)
            ? self.now = replace(self.now)(index0)(0)
            : undefined))(self.now = replace(self.now)(index1)(1))));
        self.sync((updateFlags) => selfAll.now =
            (updateFlags //all  updated--------
                .reduce((a, b) => (a * b)) !== 1)
                ? undefined //no trigger
                : right$1(self.now = Array(TLs.length).fill(0))(TLs.map((TL) => TL.now)));
    });
    const allThenResetTL = (TLs) => T((selfAll) => updateFlagsTL(TLs)(selfAll));

    exports.allThenResetTL = allThenResetTL;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
