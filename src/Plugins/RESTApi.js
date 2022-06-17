const { resolve } = require('path');

// Plugin: RESTApi
module.exports = async (express, app, router, axios, cache) => {

    // RESTApi: Routers
    const { readdirSync } = require('fs');
    const routes = readdirSync(resolve('src/Resources/ServerAPI')).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);;
    for (const route of routes)
        require(resolve(`src/Resources/ServerAPI/${route}`))(express, app, router, axios, cache);

    // RESTApi: Net-ipc Server
    const { Client } = require('net-ipc');
    app.client = new Client({
        host: process.env.NETIPC.split(':')[0],
        port: process.env.NETIPC.split(':')[1],
        tls: true,
        reconnect: true,
        retries: Infinity,
        options: {
            pskCallback: () => {
                return {
                    identity: process.env.IDENTITY.split(':')[0],
                    psk: Buffer.from(process.env.IDENTITY.split(':')[1])
                }
            },
            ciphers: 'PSK',
            checkServerIdentity: () => void 0
        }
    });

    // RESTApi: Net-ipc Server Connect
    app.client.connect().catch(() => { });

    // RESTApi: Main 
    router.get('/api', async (req, res) => {
        try {
            return res.json({ statusCode: 200, statusText: 'Miuky API Online!' })
        } catch {
            return res.json({ statusCode: 503, statusText: 'Miuky API Offline!' })
        }
    });

    // RESTApi: Handler Error
    router.use('/api', (req, res) => {
        return res.status(404).json({ statusCode: 404, statusText: 'Endpoint not found.' })
    });

}