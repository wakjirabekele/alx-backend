function createPushNotificationsJobs(jobs, queue){
	if (!Array.isArray(jobs)){
			throw Error('Jobs is not an array')
	}
	jobs.forEach((data) => {
			const job = queue.create('push_notification_code_3', data).save( function(err){
					if(!err){
							console.log(`Notification job created: ${job.id}`);
					}
			});

			job.on('complete', function(){
					console.log(`Notification job ${job.id} completed`);  
			});

			job.on('failed', function(error){
					console.log(`Notification job ${job.id} failed: ${error}`);
			});

			job.on('progress', function(progress){
					console.log(`Notification job ${job.id} ${progress}% complete`);
			});
	});
}

module.exports = createPushNotificationsJobs;
