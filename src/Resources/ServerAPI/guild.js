
// Guild: Routers
module.exports = (express, app, router, axios) => {
    router.use('/api/guilds', (req, res, next) => {
        if (!req.isAuthenticated || !req.user) return res.json({ statusCode: 401, statusText: "Unauthorized" });
        next();
    });

    router.get('/api/guilds', (req, res) => {
        res.json(req.user.guilds);
    });
}
