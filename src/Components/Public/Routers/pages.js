
// Routers: Default Pages
module.exports = (express, app, router, axios) => {

    router.route('/').get((req, res) => {
        return app.template('home')(req, res);
    });

    router.route('/commands').get(async (req, res) => {
        const commands = await app.client.request({
            type: 'commands',
            data: { lang: req.lang.code || req.session.language || 'en' }
        }).catch(() => { return null });

        if (!commands) return res.redirect(req.lang.routeTo('/error?statusCode=502&message=badGateway'));
        return app.template('commands', { commands })(req, res);
    });

    router.route('/privacy-terms').get((req, res) => {
        return app.template('privacy')(req, res);
    });

    router.route('/status').get(async (req, res) => {
        const stats = await app.client.request({
            type: 'stats'
        }).catch(() => { return null });

        if (!stats) return res.redirect(req.lang.routeTo('/error?statusCode=502&message=badGateway'));
        return app.template('status', { stats })(req, res);
    });
}