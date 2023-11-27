const redis = require('redis')

const client = redis.createClient();

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`)
});

client.on('connect', () => {
    console.log("Redis client connected to the server")
});

const dictis = {Portland: 50,
        Seattle: 80,
        'New York': 20,
        Bogota: 20,
        Cali: 40,
        Paris: 2};

for(const [key, value] of Object.entries(dictis)){
        client.hset('HolbertonSchools', key, value, redis.print)
}

client.hgetall('HolbertonSchools', function (err, res) {
                console.log(res)
})
