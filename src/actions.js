const API = require('./api')

module.exports = {
	sendCommand(msg) {
		if (msg !== undefined) {
			try {
				if (this.config.verbose) {
					this.log('debug', `Sending command: ${msg.address}`);
				}

				API.sendCommand(msg);
			}
			catch (error) {
				this.status(this.STATUS_ERROR);
				this.setVariable('module_state', 'Error - See Log');

				let errorText = String(error);
			}
		}
	},

	actions() {
		let self = this; // required to have reference to outer `this`
		let actionsArr = {};

		actionsArr.playlistGo = {
			label: 'Trigger Playlist GO Button',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/go'
				};
				self.sendCommand(msg);
			}
		};

		actionsArr.playlistStopAll = {
			label: 'Trigger Playlist Stop All Button',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/stopall'
				};
				self.sendCommand(msg);
			}
		};

		this.setActions(actionsArr);
	},
}
