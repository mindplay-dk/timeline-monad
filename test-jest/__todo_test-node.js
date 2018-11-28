const { T } = require("../index.js");

console.log("test-start");

const consoleTL = ((console) => T(
  (self) => self.sync((a) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a) => (consoleTL.now = a);

{

  consoleTL.now = "monad laws";
  {
    const timelineOf = (a) =>//instant fill
      T(timeline => (timeline.now = a));

    const f = (a) => a * 2;

    const a = 5;
    consoleTL.now = f(a); //10


    consoleTL.now = "left";

    timelineOf(a)
      .sync(f)
      .sync(log); //10

    consoleTL.now = "right";

    timelineOf(a)
      .sync(timelineOf)
      .sync(log); //5


    consoleTL.now = "Associativity";

    const m = T();

    const g = (a) => a + 1;

    m
      .sync(f)
      .sync(g)
      .sync(log);//11

    const fg = (a) => g(f(a));//composition
    m
      .sync(fg)
      .sync(log);//11


    const fgTL = (a) =>//composition of timeline
      timelineOf(a)
        .sync(f)
        .sync(g);

    m
      .sync(fgTL)
      .sync(log);//11

    m.now = 5;

  }



  //
  //
  consoleTL.now = "double-check";
  {
    const f = (m) => m.sync((a) => a * 2);
    const a = T();
    const aa = T();
    const bb = aa.sync(f);
    const nouseTL = bb.sync(log);
    aa.now = a;
    a.now = 7;
  }


  consoleTL.now = "composition of Monad of Monad";
  {
    const timelineOf = (a) =>//instant fill
      T(timeline => (timeline.now = a));

    const m = T();
    const mm = timelineOf(m);

    const f = (a) => a * 2;
    const g = (a) => a + 1;

    const fgTL = (m) =>//composition of timeline
      (m)
        .sync(f)
        .sync(g);

    mm
      .sync(fgTL)
      .sync(log);//11


    m.now = 100;


  }
};
