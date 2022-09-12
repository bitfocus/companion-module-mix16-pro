module.exports = {
	updateVariableDefinitions() {
		let variables = [
			{ label: 'Module State', 					name: 'module_state'},

			{ label: 'Version', 					name: 'version'},
		];

		for (let i = 0; i < this.STATUS.playlistCues.length; i++) {
			let varObj = {
				label: 'Cue ' + (i+1) + ' Name',
				name: 'cue_' + (i+1) + '_name'
			};

			variables.push(varObj);
		}

		this.setVariableDefinitions(variables);
	},

	checkVariables() {
		try {
			this.setVariable('version', 					this.STATUS.version);

			for (let i = 0; i < this.STATUS.playlistCues.length; i++) {
				this.setVariable('cue_' + (i+1) + '_name', this.STATUS.playlistCues[i].name);
			}
		}
		catch(error) {
			//do something with that error
			if (this.config.verbose) {
				this.log('debug', 'Error Updating Variables: ' + error);
			}
		}
	}
}