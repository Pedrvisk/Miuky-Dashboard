
// Status: Routers
module.exports = (express, app, router, axios, cache) => {
    router.get('/api/stats', async (req, res) => {
        const cacheExpire = global.functions.checkCooldown(cache.getTtl('stats'));
        if (cacheExpire.inCooldown) return res.json(cache.get('stats'));

        try {
            await app.client.request({
                type: 'stats'
            }).then((data) => cache.set('stats', data, 30));

            return res.json(cache.get('stats'))
        } catch {
            return res.json(cache.get('stats'))
        }
    });
}
