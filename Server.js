const Dashboard = require('./Dashboard.js');

// Dashboard: HTTPS/SSL
require('greenlock-express').init({
    packageRoot: __dirname,
    configDir: './greenlock',
    maintainerEmail: 'YOUR_EMAIL',
    cluster: false
}).serve(Dashboard);