const { listPackage } = require('asar');
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

		actionsArr.playlistSetGo = {
			label: 'Trigger Playlist Set GO Number',
			options: [
				{
					type: 'number',
					label: 'Cue Number',
					id: 'cuenumber',
					default: 1,
					required: true
				}
			],
			//options: options,
			callback: function (action, bank) {
				let msg = {
					address: 'mix16apps/playlist/setgo',
					args: [
						{
							type: 'i',
							value: parseInt(action.options.cuenumber)
						}
					]
				};
				self.sendCommand(msg, self);
			}
		};

		actionsArr.playlistGo = {
			label: 'Trigger Playlist GO Button',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/go'
				};
				self.sendCommand(msg, self);
			}
		};

		actionsArr.playlistNextCue = {
			label: 'Select Playlist Next Cue',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/nextcue'
				};
				self.sendCommand(msg, self);
			}
		};

		actionsArr.playlistPrevCue = {
			label: 'Select Playlist Previous Cue',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/prevcue'
				};
				self.sendCommand(msg, self);
			}
		};

		actionsArr.playlistStopAll = {
			label: 'Trigger Playlist Stop All Button',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/stopall'
				};
				self.sendCommand(msg, self);
			}
		};

		this.setActions(actionsArr);
	},
}
