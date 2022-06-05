const { resolve } = require('path');
const Dashboard = require(resolve('Dashboard.js'));

// Dashboard: HTTPS/SSL
require('greenlock-express').init({
    packageRoot: __dirname,
    configDir: resolve('greenlock'),
    maintainerEmail: 'theusvrick@gmail.com',
    cluster: false
}).serve(Dashboard);