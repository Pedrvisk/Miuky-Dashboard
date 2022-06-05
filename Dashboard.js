require('dotenv').config();
const { resolve } = require('path');

// Dashboard: Express
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const app = express();

// Dashboard: Cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ deleteOnExpire: false });

// Dashboard: Settings
app.set('view engine', 'ejs');
app.set('views', resolve('src/Components/Views'));
// ------------------------------------- //
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve('src/Components/Public')));
// ------------------------------------- //
router.use(express.static(resolve('src/Components/Public')));

// Dashboard: Debug Log
app.debug = (message) => {
    return console.log(`\x1b[1;34m [${new Date().toLocaleTimeString()}]\x1b[1;33m | \x1b[1;36m${message}`);
}

// Dashboard: Plugins
const { readdirSync } = require('fs');
const files = readdirSync(resolve('src/Plugins')).filter((file) => file.endsWith('.js'));

console.log(`\x1b[1;33m────────────────────────────[\x1b[1;36mPlugins\x1b[1;33m]────────────────────────────`);
for (let file of files) {
    require(resolve(`src/Plugins/${file}`))(express, app, router, axios, cache);
    app.debug(file.split('.')[0]);
}

// Dashboard: Listen
app.listen(3000, () => {
    console.log(`\x1b[1;33m────────────────────────────[\x1b[1;36mServer\x1b[1;33m]─────────────────────────────`);
    console.log(` \x1b[1;36mPort: \x1b[1;32m3000\x1b[1;33m | \x1b[1;36mStatus: \x1b[1;32mOnline`);
    return console.log('\x1b[1;33m─────────────────────────────────────────────────────────────────');
});
// module.exports = app;