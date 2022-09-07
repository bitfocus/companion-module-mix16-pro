module.exports = {
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls Mix16\'s GO and PRO software.</a>'
			},
			{
				type: 'textinput',
				id: 'host',
				width: 8,
				label: 'Target IP',
				default: '127.0.0.1',
				regex: this.REGEX_IP
			},
			{
				type: 'number',
				id: 'port',
				width: 6,
				label: 'Target Port',
				default: '9000',
				regex: this.REGEX_PORT
			},
			{
				type: 'number',
				id: 'receiveport',
				width: 6,
				label: 'Receive Port',
				default: '9001',
				regex: this.REGEX_PORT
			},
			{
				type: 'text',
				id: 'dummy1',
				width: 12,
				label: ' ',
				value: ' ',
			},
			{
				type: 'text',
				id: 'info2',
				label: 'Polling',
				width: 12,
				value: `
					<div class="alert alert-warning">
						<strong>Please read:</strong>
						<br>
						Enabling polling unlocks these features:
						<br><br>
						<ul>
							<li>Changes made in the software outside of this module</li>
						</ul>
						Enabling polling will send a request to the Device at a continuous interval.
						<br>
						<strong>This could have an undesired performance effect on your Device, depending on the polling rate.</strong>
						<br>
					</div>
				`
			},
			{
				type: 'checkbox',
				id: 'polling',
				label: 'Enable Polling (necessary for feedbacks and variables)',
				default: false,
				width: 9
			},
			{
				type: 'textinput',
				id: 'pollingrate',
				label: 'Polling Rate (in ms)',
				default: 1000,
				width: 3,
				isVisible: (configValues) => configValues.polling === true,
			},
			{
				type: 'text',
				id: 'dummy2',
				width: 12,
				label: ' ',
				value: ' ',
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			}
		]
	},
}
