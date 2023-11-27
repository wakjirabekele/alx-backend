const redis = require('redis');

const client = redis.createClient();
const { promisify } = require('util');
const kue = require('kue');

const queue = kue.createQueue();
const express = require('express');

const app = express();
const port = 1245;

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  await getAsync('available_seats');
}

let reservationEnabled;

app.get('/available_seats', async (req, res) => {
  const avaible = await getCurrentAvailableSeats();
  res.json({ avaible });
});

app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
  }
  const getAvai = await getCurrentAvailableSeats();
  const job = queue.create('reserve_seat', { getAvai }).save((err) => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });
  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });
  job.on('failed', (error) => {
    console.log(`Seat reservation job ${job.id} failed: ${error}`);
  });
});

app.get('/process', async (req, res) => {
  queue.process('reserve_seat', async (job, done) => {
    const getAvai = await getCurrentAvailableSeats();
    if (job.data.getAvai <= 0) {
      done(Error('Not enough seats available'));
    }
    const decres = Number(job.data.getAvai) - 1;
    await reserveSeat(decres);

    if (job.data.getAvai === 0) {
      reservationEnabled = false;
    }
    done();
  });
  res.json({ status: 'Queue processing' });
});

app.listen(port, () => {
  reserveSeat(50);
  reservationEnabled = true;
  console.log(`Example app listening on port ${port}`);
});
