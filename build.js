const rollup = require("rollup")
const commonjs = require("rollup-plugin-commonjs");

const inputOptions = {
    input: "./dist/esm/timeline-monad.js",
    plugins: [commonjs()]
};
const outputOptions = [{
    dir: "./dist/umd",
    file: "timeline-monad.js",
    format: "umd"
},
{
    dir: "./dist/cjs",
    file: "timeline-monad.js",
    format: "cjs"
}];

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log(bundle.watchFiles);
    const { output } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
        if (chunkOrAsset.isAsset) {
            console.log('Asset', chunkOrAsset);
        } else {
            console.log('Chunk', chunkOrAsset.modules);
        }
    }

    await bundle.write(outputOptions);
}

build();