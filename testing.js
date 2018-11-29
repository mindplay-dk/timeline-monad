
const requireEsm = require('esm')(module);

const { T } = requireEsm("./build/modules/timeline-monad.js");
const log = a => {
    console.log(a);
    return a;
};

const timelineOf = (a) =>
    T(self => (self.now = a));





const f = (a) => (a * 2);
const g = (a) => (a + 1);

{
    const a = timelineOf(50);
    const fTL = (a) => a.sync(f);
    const gTL = (a) =>
        timelineOf(a).sync(g);


    timelineOf(a)
        .sync(fTL)
        .sync(gTL)
        .sync(log)

}
