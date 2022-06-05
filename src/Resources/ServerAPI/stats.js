
// Status: Routers
module.exports = (express, app, router, axios) => {
    router.get('/api/stats', async (req, res) => {
        return await app.client.request({
            type: 'stats'
        }).then((data) => res.json(data));
    });
}
