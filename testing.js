

const array = [1, 2, 3, 4, 5];

console.log(
    array
        .flatMap(a =>

            a % 2 === 1
                ? [[a]]
                : [[]]
        )

);


console.log(
    array
        .map(a =>

            a % 2 === 1
                ? a
                : undefined
        )
    // .flat()

);



const unit = a => [a];
const f = a => [a * 2];

//self structure

console.log(

    unit(3)
        .flatMap(f)

);

console.log(

    f(3)

);



console.log(

    [3].flatMap(a => [a])

);

console.log(

    f(3).flatMap(unit)

);

console.log(

    unit(3).flatMap(unit)

); //unit  * unit = unit


console.log(
    "==================="
);
{
    const f = a => [a * 2];
    const g = a => [a + 1];
    console.log(

        unit(3)
    );

    console.log(

        unit(3)
            .flatMap(f)
    );

    {
        console.log(

            unit(3)
                .flatMap(f)
                .flatMap(g)
        );


        const h = a => unit(a)
            .flatMap(f)
            .flatMap(g);


        console.log(
            unit(3)
                .flatMap(h)
        );
    }
}
console.log(
    "==================="
);
{
    const f = a => a * 2;
    const g = a => a + 1;
    console.log(

        unit(3)
            .map(f)
            .map(g)
    );


    const h = a => [a]
        .map(f)
        .map(g);


    console.log(
        unit(3)
            .map(h)
    );
}

//map implementation differentials




Object.defineProperty(
    Number.prototype,
    "plus", {
        value: function (val) {
            return this + val;
        }
    });

//plus(plus(plus(1)(2))(5))(9)

console.log((1).plus(9))

console.log(
    "Hello world"
        .replace("Hello", "Hi")
        .replace("world", "JavaScript")

);

{
    const e = Number;

    Object.defineProperty(
        e.prototype,
        "map", {
            value: function (f) {
                return f(this);
            }
        });
    const f = a => a * 2;
    console.log(
        e(1).map(f)
    );

    console.log(
        e(1).map(e)
    );

    console.log(
        e(1) === 1
    );

}