const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    // host: keys.redisHost,
    // port: keys.redisPort,
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
    // url: 'redis://redis:6379',
    retry_strategy: () => 1000,
});
redisClient.connect()
const sub = redisClient.duplicate();
sub.connect()

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

sub.subscribe('insert', (message) => {
    console.log('start Caluclating for ', message)
    redisClient.hSet('values', message, fib(parseInt(message)));
    console.log('end Calculating for ', message)
});
