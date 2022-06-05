
// Routers: Default Pages
module.exports = (express, app, router, axios) => {

    router.route('/').get((req, res) => {
        return app.template('home')(req, res);
    });

    router.route('/commands').get(async (req, res) => {
        const commands = await axios.get(`${process.env.DOMAIN}/${req.lang.code}/api/commands`).then((res) => { return res.data }).catch(() => { return null });
        if (!commands) return res.redirect(req.lang.routeTo('/error?statusCode=502&message=badGateway'));
        return app.template('commands', { commands })(req, res);
    });

    router.route('/privacy-terms').get((req, res) => {
        return app.template('privacy')(req, res);
    });

    router.route('/status').get(async (req, res) => {
        const stats = await axios.get(`${process.env.DOMAIN}/api/stats`).then((res) => { return res.data }).catch(() => { return null });
        if (!stats) return res.redirect(req.lang.routeTo('/error?statusCode=502&message=badGateway'));
        return app.template('status', { stats })(req, res);
    });
}