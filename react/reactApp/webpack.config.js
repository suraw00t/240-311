var config = {
    entry: "./src/index.js",
    output: { 
        path: "/",
        filename: "bundle.js" 
    },
    devServer: { 
        port: 8080 
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { 
                    presets: [
                    ] 
                },
            },
        ],
    },
}

module.exports = config;
