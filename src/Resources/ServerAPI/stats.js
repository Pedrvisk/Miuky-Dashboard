const moment = require('moment');
require('moment-duration-format');

// Status: Routers
module.exports = (express, app, router, axios, cache) => {
    router.get('/api/stats', async (req, res) => {
        const cacheExpire = global.functions.checkCooldown(cache.getTtl('stats'));
        if (cacheExpire.inCooldown) return res.json(cache.get('stats'));

        try {
            await app.client.request({
                type: 'stats'
            }).then((res) => {
                for (let i = 0; i < res.data.clusters.length; i++)
                    res.data.clusters[i].uptime = moment.duration(res.data.clusters[i].uptime).format('D[D] H[H] m[M] s[S]');

                return cache.set('stats', res, 30)
            });

            return res.json(cache.get('stats'))
        } catch {
            return res.json(cache.get('stats'))
        }
    });
}
