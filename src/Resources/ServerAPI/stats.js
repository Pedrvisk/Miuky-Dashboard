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
            }).then((data) => {
                for (let i = 0; i < data.clusters.length; i++)
                    data.clusters[i].uptime = moment.duration(data.clusters[i].shards[0].uptime).format('D[D] H[H] m[M] s[S]');

                return cache.set('stats', data, 30)
            });

            return res.json(cache.get('stats'))
        } catch {
            return res.json(cache.get('stats'))
        }
    });
}
