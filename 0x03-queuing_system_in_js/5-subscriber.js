const redis = require('redis');

const subscriber = redis.createClient();


subscriber.on('connect', () => {
            console.log("Redis client connected to the server")
});

subscriber.on('error', (error) => {
            console.log(`Redis client not connected to the server: ${error.message}`)
});

const channel = 'holberton school channel';

subscriber.subscribe(channel)

subscriber.on('message', (channel, message) => {
                if (channel == 'holberton school channel') {
                        console.log(message)
                }
                if (message == 'KILL_SERVER') {
                        subscriber.unsubscribe()
                        subscriber.quit()
                }
});
