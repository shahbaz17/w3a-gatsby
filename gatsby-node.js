exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    const webpack = require('webpack');
    actions.setWebpackConfig({
        resolve: {
            fallback: {
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
                assert: require.resolve("assert"),
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                os: require.resolve("os-browserify"),
                url: require.resolve("url"),
                zlib: require.resolve("browserify-zlib"),
            },
        },
        plugins: [
            plugins.provide({ process: 'process/browser' }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        ],
    })
}