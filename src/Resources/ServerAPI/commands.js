
// Commands: Routers
module.exports = (express, app, router, axios, cache) => {
    router.get('/api/commands', async (req, res) => {
        const cacheExpire = global.functions.checkCooldown(cache.getTtl('commands'));
        if (cacheExpire.inCooldown) return res.json(cache.get('commands'));

        try {
            await app.client.request({
                type: 'commands',
                data: { lang: req.lang.code || 'en' }
            }).then((data) => cache.set('commands', data, 300));

            return res.json(cache.get('commands'))
        } catch {
            return res.json(cache.get('commands'))
        }
    });
}
