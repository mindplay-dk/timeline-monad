export default {
    input: "./dist/esm/timeline-monad.js",
    output: [{
        file: "./dist/umd/timeline-monad.js",
        format: "umd",
        name: "timeline-monad"
    }
        , {
        file: "./dist/cjs/timeline-monad.js",
        format: "cjs"
    }]
};