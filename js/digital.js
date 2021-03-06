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
			SW = ((100 / 60) * Second) + '%',
			meridiem = thisDate.get("hours") > 12 ? "PM" : "AM";
				
		var doc =
			'<div class="graph-cointainer">' +
			'   <div class="graph-hour">' +
			'		' + String(thisDate.format('%l')).trim() + ' Hours<br>' +
			'		<div class="graph-purple" style="width:' + HW + '"></span>' +
			'	</div>' +
			'	<div class="graph-minute">' +
			'		' + String(thisDate.format('%M')).trim() + ' Minutes<br>' +
			'		<div class="graph-red" style="width:' + MW + ' "></span>' +
			'	</div>' +
			'	<div class="graph-second">' +
			'		' + String(thisDate.format('%S')).trim() + ' Seconds<br>' +
			'		<div class="graph-green" style="width:' + SW + ' "></span>' +
			'	</div>' +
			'	<div class="graph-second">' + 
			'		' + meridiem + '<br>' +
			'		<div class="graph-yellow" style="width:' + HW + ' "></span>' +
			'	</div>' +
			'</div>';

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