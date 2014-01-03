/* global Class, console */

var Digital = new Class({

	initialize: function () {
		this.status = {
			viewType: "Digital View"
		};
	},

	commands: function () {
		return "<a>Digital View</a>&nbsp;/&nbsp;<a>Graph View</a>&nbsp;/&nbsp;<a>Analog View</a>";
	},

	dispatch: function (command, bound) {
		bound.status.viewType = command;
		console.log(command, bound.status);
	},

	renderDigitalView: function () {
		var thisDate = new Date(),
			thisString =
				String(thisDate.format('%l')) + '<span class="accent">:</span>' +
				String(thisDate.format('%M')) + '<span class="accent">.</span>' +
				String(thisDate.format('%S'));

		if (thisDate.get('hr') >= 12) {
			thisString += '<span class="ampm">pm</span>';
		} else {
			thisString += '<span class="ampm">am</span>';
		}

		return thisString;
	},

	renderGraphView: function () {
		var thisDate = new Date(),
			Hour = thisDate.format('%l').trim(),
			Minute = thisDate.format('%M').trim(),
			Second = thisDate.format('%S').trim(),
			HW = ((100 / 12) * Hour) + '%',
			MW = ((100 / 60) * Minute) + '%',
			SW = ((100 / 60) * Second) + '%';

		console.log(HW, MW, SW);

		var doc =
			'<table class="graph-cointainer">' +
			'<tr>' +
			'   <td class="graph-hour">' +
			'		<div class="graph-purple" style="width:' + HW + '">Hour&nbsp;(' + String(thisDate.format('%l')).trim() + ')</span>' +
			'	</td>' +
			'</tr><tr>' +
			'	<td class="graph-minute">' +
			'		<div class="graph-red" style="width:' + MW + ' ">Minute&nbsp;(' + String(thisDate.format('%M')).trim() + ')</span>' +
			'	</td>' +
			'</tr><tr>' +
			'	<td class="graph-second">' +
			'		<div class="graph-green" style="width:' + SW + ' ">Second&nbsp;(' + String(thisDate.format('%S')).trim() + ')</span>' +
			'	</td>' +
			'</tr></table>';

		return doc;
	},

	display: function (bound) {
		switch (bound.status.viewType) {
		case "Digital View":
			return bound.renderDigitalView();
			break;
		case "Graph View":
			return bound.renderGraphView();
			break;
		default:
			return "N/A";
			break;
		}
	}
});