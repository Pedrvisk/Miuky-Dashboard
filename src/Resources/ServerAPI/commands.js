
// Commands: Routers
module.exports = (express, app, router, axios, cache) => {
    router.get('/api/commands', async (req, res) => {
        const cacheExpire = global.functions.checkCooldown(cache.getTtl(`${req.lang.code}_commands`));
        if (cacheExpire.inCooldown) return res.json(cache.get(`${req.lang.code}_commands`));

        try {
            await app.client.request({
                type: 'commands',
                data: { lang: req.lang.code || 'en' }
            }).then((data) => cache.set(`${req.lang.code}_commands`, data, 300));

            return res.json(cache.get(`${req.lang.code}_commands`));
        } catch {
            return res.json(cache.get(`${req.lang.code}_commands`));
        }
    });
}
