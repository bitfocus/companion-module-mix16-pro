const API = require('./api');

module.exports = {
	/**
	 * Inits the polling logic
	 */
	initPolling() {
		let self = this;

		// Cleanup old interval
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		// Setup polling if enabled and host is set
		if (this.config.polling && this.config.host) {
			this.log('debug', `Polling started. Requesting new data from server every ${this.config.pollingrate}ms`);

			this.pollingInterval = setInterval(async () => {
				API.getData();
			}, this.config.pollingrate)
		}
	}
}
