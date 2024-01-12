exports.onCreateWebpackConfig = ({ actions, plugins, getConfig }) => {
    const webpack = require("webpack");
    const path = require("path");
    const config = getConfig();
    if (config.externals && config.externals[0]) {
        config.externals[0]["node:crypto"] = require.resolve("crypto-browserify");
    }
    actions.setWebpackConfig({
        ...config,
        resolve: {
            fallback: {
                crypto: false,
                stream: false,
                assert: require.resolve("assert/"),
                http: false,
                https: false,
                os: false,
                url: false,
                zlib: false,
                "object.assign/polyfill": path.resolve("./node_modules/object.assign/polyfill.js"),
            },
        },
        plugins: [
            plugins.provide({ process: "process/browser" }),
            new webpack.ProvidePlugin({
                Buffer: ["buffer", "Buffer"],
            }),
        ],
    });
};