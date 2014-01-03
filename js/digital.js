/* global Class */

var Digital = new Class({

	initialize: function () {},

	commands: function () {
		return "<a>Digital View</a>&nbsp;/&nbsp;<a>Graph View</a>&nbsp;/&nbsp;<a>Analog View</a>";
	},

	dispatch: function (command) {},

	display: function () {
		var thisDate = new Date(),
			thisString =
				String(thisDate.format('%I')) + '<span class="accent">:</span>' +
				String(thisDate.format('%M')) + '<span class="accent">.</span>' +
				String(thisDate.format('%S'));

		if (thisDate.get('hr') >= 12) {
			thisString += '<span class="ampm">pm</span>';
		} else {
			thisString += '<span class="ampm">am</span>';
		}

		return thisString;
	}
});
