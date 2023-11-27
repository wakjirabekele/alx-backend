const redis = require('redis')
const { promisify } = require('util');

const client = redis.createClient();
const get_asy = promisify(client.get).bind(client);

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`)
});

client.on('connect', () => {
    console.log("Redis client connected to the server")
});

function setNewSchool(schoolName, value) {
        client.set(schoolName, value, redis.print)
}

async function displaySchoolValue(schoolName) {
        const reply = await get_asy(schoolName);
                console.log(reply);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
