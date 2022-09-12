const OSC = require('osc');

class API {
	constructor(config, self) {
		console.log('CONFIG*********');
		console.log(config);
		const apiHost = config.host
		const apiPort = config.port

		if (self.oscSocket == null) {
			if (self.config.host) {
				self.oscSocket = new OSC.UDPPort({
					localAddress: '0.0.0.0',
					localPort: config.receiveport,
					address: config.host,
					port: config.port,
					metadata: true
				});

				self.connecting = true;
	
				self.oscSocket.open();
	
				self.oscSocket.on('error', (err) => {
					debug('Error', err);
					self.log('error', 'Error: ' + err.message);
					self.connecting = false;
					self.status(self.STATUS_ERROR, 'Can\'t connect to Software');
					if (err.code == 'ECONNREFUSED') {
						self.oscSocket.removeAllListeners();
					}
				});
	
				self.oscSocket.on('close', () => {
					self.log('error', 'Connection to Software Closed');
					self.connecting = false;
					self.status(self.STATUS_WARNING, 'CLOSED');
				});
	
				self.oscSocket.on('ready', () => {
					self.connecting = false;
					self.log('info','Connected to Software:' + config.host);
				});
	
				self.oscSocket.on('message', (message) => {
					self.processMessage(message);
					self.checkFeedbacks();
					self.checkVariables();
				});
	
				self.oscSocket.on('data', (data) => {
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

	static sendCommand(msg, self) {
		if (self.oscSocket !== null) {
			self.oscSocket.send(msg);
		}
		else {
			//throw an error
		}
	}

	static getData(self) {
		if (self.oscSocket !== null) {

			let basicInfoMsg = {
				address: '/mix16apps/basicinfo'
			};

			self.oscSocket.send(basicInfoMsg);

			let fullInfoMsg = {
				address: '/mix16apps/fullinfo'
			};

			self.oscSocket.send(fullInfoMsg);
		}
		else {
			//throw an error
		}
	}
}

module.exports = API;