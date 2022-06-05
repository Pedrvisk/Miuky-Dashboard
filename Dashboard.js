require('dotenv').config();
const { resolve } = require('path');

// Dashboard: Express
const axios = require('axios');
const express = require('express');
const router = express.Router();
const app = express();

// Dashboard: Settings
app.set('view engine', 'ejs');
app.set('views', resolve('src/Components/Views'));
// ------------------------------------- //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve('src/Components/Public')));
// ------------------------------------- //
router.use(express.static(resolve('src/Components/Public')));

// Dashboard: Plugins
const { readdirSync } = require('fs');
const files = readdirSync(resolve('src/Plugins')).filter((file) => file.endsWith('.js'));
for (let file of files)
    require(resolve(`src/Plugins/${file}`))(express, app, router, axios);

// Dashboard: Listen
app.listen(3000, () => console.log('Online'));
// module.exports = app;