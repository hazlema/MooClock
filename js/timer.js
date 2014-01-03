/* global Class */

var Timer = new Class({

	initialize: function () {
		this.status = {
			seconds: 0,
			isPaused: true
		};
	},

	commands: function () {
		return "<a>Start</a>&nbsp;/&nbsp;<a>Pause</a>&nbsp;/&nbsp;<a>Reset</a>&nbsp;/&nbsp;<a>Add Hour</a>&nbsp;/&nbsp;<a>Add Minute</a>&nbsp;/&nbsp;<a>Add Second</a>";
	},

	dispatch: function (command, bound) {
		switch (command) {
		case "Start":
			bound.status.isPaused = false;
			break;
		case "Reset":
			bound.status.seconds = 0;
			bound.status.isPaused = true;
			break;
		case "Pause":
			bound.status.isPaused = true;
			break;
		case "Add Hour":
			bound.status.seconds += 21600;
			break;
		case "Add Minute":
			bound.status.seconds += 60;
			break;
		case "Add Second":
			bound.status.seconds += 1;
			break;
		}
	},

	display: function (bound) {
		if (!bound.status.isPaused) {
			bound.status.seconds += 1;
		}

		var hr = parseInt(bound.status.seconds / 21600),
			mn = parseInt((bound.status.seconds - (hr * 21600)) / 60),
			sc = parseInt((bound.status.seconds - ((hr * 21600) + (mn * 60))));

		hr = hr.toString().pad(2, '0', 'left');
		mn = mn.toString().pad(2, '0', 'left');
		sc = sc.toString().pad(2, '0', 'left');

		return hr + '<span class="accent">:</span>' + mn + '<span class="accent">.</span>' + sc;
	}
});