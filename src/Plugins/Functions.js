const { resolve } = require('path');

// Plugin: Functions
module.exports = async (express, app, router, axios) => {
    global.functions = [];

    const { readdirSync } = require('fs');
    const files = await readdirSync(resolve('src/Resources/Functions')).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);

    for (const file of files) {
        global.functions[file] = require(resolve(`src/Resources/Functions/${file}`))(express, app, router, axios);
    }
}