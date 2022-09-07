module.exports = {
    // ##########################
    // #### Define Feedbacks ####
    // ##########################
    feedbacks() {
        let self = this;
        const feedbacks = {};

        const foregroundColorWhite = self.rgb(255, 255, 255) // White
        const foregroundColorBlack = self.rgb(0, 0, 0) // Black
        const backgroundColorRed = self.rgb(255, 0, 0) // Red
        const backgroundColorGreen = self.rgb(0, 255, 0) // Green
        const backgroundColorOrange = self.rgb(255, 102, 0) // Orange

        feedbacks['micStatus'] = {
            type: 'boolean',
            label: 'Show Mic Status On Button',
            description: 'Indicate if Mic is in X State',
            style: {
                color: foregroundColorWhite,
                bgcolor: backgroundColorRed,
            },
            options: [
                {
                    type: 'dropdown',
                    label: 'Indicate in X Status',
                    id: 'status',
                    default: 'false',
                    choices: [
                        { id: 'false', label: 'Off' },
                        { id: 'true', label: 'On' }
                    ]
                }
            ],
            callback: function (feedback) {
                let opt = feedback.options;

				if (self.STATUS.micStatus.toString() == opt.status.toString()) {
					return true;
				}

                return false
            }
        }

        self.setFeedbackDefinitions(feedbacks);
    }
}