const { resolve } = require('path');
const { connect, model, Schema } = require('mongoose');
const { readdirSync } = require('fs');

// Plugin: Database
module.exports = async (express, app, router, axios) => {
    
    app.database = connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const files = await readdirSync(resolve('src/Resources/Models')).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);
    for (const file of files)
        app.database[file] = model(file, require(resolve(`src/Resources/Models/${file}`))(Schema))
}