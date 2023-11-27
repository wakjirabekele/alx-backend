import createPushNotificationsJobs from './8-job.js'
const kue = require('kue')
const queue = kue.createQueue()
import { expect } from "chai";

describe('createPushNotificationsJobs', () => {
	before(function() {
		queue.testMode.enter();
	});

	afterEach(function() {
		queue.testMode.clear();
	});

	after(function() {
		queue.testMode.exit()
	});

	it("if jobs is not an array passing Number", () => {
		expect(() => {
			createPushNotificationsJobs(2, queue);
		}).to.throw("Jobs is not an array");
	});

	it("if jobs is not an array passing Object", () => {
		expect(() => {
			createPushNotificationsJobs({}, queue);
		}).to.throw("Jobs is not an array");
	});

	it("if jobs is not an array passing String", () => {
		expect(() => {
		createPushNotificationsJobs("Hello", queue);
		}).to.throw("Jobs is not an array");
	});
});
