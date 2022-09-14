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

		// *** Playlist Category ***
		// /mix16apps/playlist/go - trigger playlist GO button
		actionsArr.playlistGo = {
			label: 'Trigger Playlist GO Button',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/go'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/playlist/setgo <cue_number> - set playlist GO button to desired cue number
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
		
		// /mix16apps/playlist/stopall - trigger playlist Stop All Cues button
		actionsArr.playlistStopAll = {
			label: 'Trigger Playlist Stop All Cues Button',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/stopall'
				};
				self.sendCommand(msg, self);
			}
		};

		// *** Live Input Category ***
		// /mix16apps/livein/camera/start - toggle start / stop live input camera
		actionsArr.cameraLiveToggle = {
			label: 'Toggle Start / Stop Live Input Camera',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/livein/camera/start'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/livein/camera/freeze - toggle freeze / unfreeze live input camera
		actionsArr.cameraFreezeToggle = {
			label: 'Toggle Freeze / Unfreeze Live Input Camera',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/livein/camera/freeze'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/livein/camera/noshow - toggle no show / show live input camera
		actionsArr.cameraShowToggle = {
			label: 'Toggle Show / No show Live Input Camera',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/livein/camera/noshow'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/livein/mic/start - toggle start / stop live input microphone
		actionsArr.micLiveToggle = {
			label: 'Toggle Start / Stop Live Input Microphone',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/livein/mic/start'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/livein/mic/mute - toggle mute / unmute live input microphone
		actionsArr.micMuteToggle = {
			label: 'Toggle Mute / Unmute Live Input Microphone',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/livein/mic/mute'
				};
				self.sendCommand(msg, self);
			}
		};
		
		// *** Playlist Category ***
		// /mix16apps/playlist/nextcue - select playlist next cue
		actionsArr.playlistNextCue = {
			label: 'Select Playlist Next Cue',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/nextcue'
				};
				self.sendCommand(msg, self);
			}
		};
		
		// /mix16apps/playlist/prevcue - select playlist previous cue
		actionsArr.playlistPrevCue = {
			label: 'Select Playlist Previous Cue',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/playlist/prevcue'
				};
				self.sendCommand(msg, self);
			}
		};

		// *** Reset Category ***
		// /mix16apps/stopall - stop all (playlist, all channels, image slide show and lighting scenes)
		actionsArr.appStopAll = {
			label: 'Trigger Stop All Button (All Playlists, Channels, Sides, & Scenes)',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/stopall'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/reset/playstatus - reset playlist cues and all channels play status (play button default stopped color)
		actionsArr.resetPlayStatus = {
			label: 'Reset Playlist Cues And All Channels Play Status',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/reset/playstatus'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/reset/chvol0 - set all channels volume to 0 %
		actionsArr.resetAllVolumeZero = {
			label: 'Set All Channels Volume to 0 %',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/reset/chvol0'
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/reset/chvol100 - set all channels volume to 100 %
		actionsArr.resetAllVolumeFull = {
			label: 'Set All Channels Volume to 100 %',
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/reset/chvol100'
				};
				self.sendCommand(msg, self);
			}
		};

		// *** Lighting Category ***
		// /mix16apps/lighting/scene/start <scene_number> - trigger lighting scene with desired lighting scene number
		actionsArr.lightingSceneTriggerNum = {
			label: 'Trigger Lighting Scene GO Number',
			options: [
				{
					type: 'number',
					label: 'Scene Number',
					id: 'scenenumber',
					default: 1,
					required: true
				}
			],
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/lighting/scene/start',
					args: [
						{
							type: 'i',
							value: parseInt(action.options.scenenumber)
						}
					]
				};
				self.sendCommand(msg, self);
			}
		};

		// /mix16apps/lighting/scene/start <scene_name> - trigger lighting scene with desired lighting scene name
		actionsArr.lightingSceneTriggerName = {
			label: 'Trigger Lighting Scene GO Name',
			options: [
				{
					type: 'textinput',
					label: 'Scene Name',
					id: 'scenename',
					default: 'default',
					required: true
				}
			],
			callback: function (action, bank) {
				let msg = {
					address: '/mix16apps/lighting/scene/start',
					args: [
						{
							type: 'textinput',
							value: action.options.scenenumber
						}
					]
				};
				self.sendCommand(msg, self);
			}
		};

		this.setActions(actionsArr);
	},
}
