const helmet = require('helmet');

// Plugin: Helmet
module.exports = (express, app, router, axios) => {
    app.use(helmet());
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "img-src": ["'self'", "data: https:"]
            }
        }
    }));
}