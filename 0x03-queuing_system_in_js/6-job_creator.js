const kue = require('kue')
const queue = kue.createQueue();

const job = queue.create('push_notification_code', {
                phoneNumber: 'string',
                message: 'string',
}).save( function(err){
        if(!err) {
                console.log(`Notification job created: ${job.id}`);
        };
});

job.on('complete', function(){
        console.log('Notification job completed');
});

job.on('failed', function(errorMessage){
        console.log('Notification job failed');
});
