const OSC = require('osc');

class API {
	constructor(config) {
		const apiHost = config.host
		const apiPort = config.port

		if (this.oscSocket == null) {
			if (config.host) {
				this.oscSocket = new OSC.UDPPort({
					localAddress: '0.0.0.0',
					localPort: config.receiveport,
					address: this.config.host,
					port: config.port,
					metadata: true
				});

				this.connecting = true;
	
				this.oscSocket.open();
	
				this.oscSocket.on('error', (err) => {
					debug('Error', err);
					this.log('error', 'Error: ' + err.message);
					this.connecting = false;
					this.status(this.STATUS_ERROR, 'Can\'t connect to Software');
					if (err.code == 'ECONNREFUSED') {
						this.oscSocket.removeAllListeners();
					}
				});
	
				this.oscSocket.on('close', () => {
					this.log('error', 'Connection to Software Closed');
					this.connecting = false;
					this.status(this.STATUS_WARNING, 'CLOSED');
				});
	
				this.oscSocket.on('ready', () => {
					this.connecting = false;
					this.log('info','Connected to Software:' + this.config.host);
				});
	
				this.oscSocket.on('message', (message) => {
					this.processMessage(message);
				  	this.checkFeedbacks();
					this.checkVariables();
				});
	
				this.oscSocket.on('data', (data) => {
				});
			}
		}
	}

	processMessage(msg) {
		console.log(msg);
		/*if (msg.address == '/mix16apps/appname') {
			this.STATUS.appName = msg.args[0];
		}*/
	}

	static sendCommand(msg) {
		if (this.oscSocket !== null) {
			this.oscSocket.send(msg);
		}
		else {
			//throw an error
		}
	}

	static getData() {
		if (this.oscSocket !== null) {

			let basicInfoMsg = {
				address: '/mix16apps/basicinfo'
			};

			this.oscSocket.send(basicInfoMsg);

			let fullInfoMsg = {
				address: '/mix16apps/fullinfo'
			};

			this.oscSocket.send(fullInfoMsg);
		}
		else {
			//throw an error
		}
	}
}

module.exports = API;