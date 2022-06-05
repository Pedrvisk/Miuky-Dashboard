const { resolve } = require('path');
const { readdirSync, existsSync } = require('fs');

// Plugin: Routers
module.exports = async (express, app, router, axios) => {

    // Routers: Handler Template
    app.template = (file, data = {}) => function (req, res, next) {
        if (!req || !res) return;

        data.user = req.user;
        data.formatUrl = req._parsedUrl.href;
        if (!data.pageTitle) data.pageTitle = req.t(`head.pages.${file}`);
        data.script = null;
        if (existsSync(resolve(`src/Components/Public/js/${file}.js`))) data.script = file;

        return res.render(file, data);
    }

    // Routers: Load
    const files = readdirSync(resolve('src/Components/Routers')).filter((file) => file.endsWith('.js'));
    for (let file of files)
        require(resolve(`src/Components/Routers/${file}`))(express, app, router, axios);
}