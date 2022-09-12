var InstanceSkel = require('../../instance_skel');

const configFields = require('./src/configFields');
const variables = require('./src/variables');
const polling = require('./src/polling');
const actions = require('./src/actions');
const presets = require('./src/presets');
const feedbacks = require('./src/feedbacks');
const API = require('./src/api');

class Mix16Instance extends InstanceSkel {
	constructor(system, id, config) {
		super(system, id, config)

		this.config = config
		
		this.pollingInterval = undefined

		this.connection = null;

		this.oscSocket = null;

		this.STATUS = {
			appName: '',
			projectName: '',
			nextCueNumber: '',
			playingCue: '',
			playlistCues: [
				{
					cueNumber: 1,
					cueName: 'mycue'
				},
				{
					cueNumber: 2,
					cueName: 'mycue'
				}
			]
		}; //used for storing data as it is returned from the device

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...variables,
			...polling,
			...actions,
			...presets,
			...feedbacks,
		})
	}

	init() {
		this.status(this.STATUS_UNKNOWN);

		// Update the config
		this.updateConfig()
	}

	updateConfig(config) {
		if (config) {
			this.config = config
		}

		// Quickly check if certain config values are present and continue setup
		if (this.config.host) {
			// Update the actions
			this.actions();

			this.feedbacks();
			this.checkFeedbacks();

			// Update Variables
			this.updateVariableDefinitions();
			this.setVariable('module_state', 'OK');
			this.checkVariables();

			// Init the presets
			this.presets();

			this.init_api();
			
			// Start polling for updates
			this.initPolling();

			// Set status to OK
			//this.status(this.STATUS_OK)
		}
	}

	init_api() {
		this.connection = new API(this.config, this);
	}

	destroy() {
		// Cleanup polling
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		this.debug('destroy', this.id);
	}
}

module.exports = Mix16Instance;