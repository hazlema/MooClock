/* global Class, Digital, Timer, document, clearInterval, console, window  */

var Clock = new Class({

	// Initalize the events, menu system 
	// and the timer
	//
	initialize: function () {
		this.initHover();
		this.initClick();

		// Load Modules
		//
		this.modules = {
			'Digital': new Digital(),
			'Timer': new Timer()
		};

		// Set the active module
		// Set the loaded flag 
		// Start the timer
		//
		this.modules.active = this.modules.Digital;
		this.loaded = false;
		this.isRunning = this.updateDisplay.periodical(1000, this);
	},

	// Setup the click events
	//
	initClick: function () {
		var self = this;

		document.getElements('.commandButton').addEvent('click', function (e) {
			e.stopPropagation();
			clearInterval(this.isRunning);

			if (!this.hasClass('active')) {
				document.getElements('div.commandButton').removeClass('active');
				this.addClass('active');

				// Tell updateDisplay() it needs to load and
				// link up the commands, set the active module
				//
				self.loaded = false;
				self.modules.active = self.modules[this.getAttribute('display-panel')];

				// Stop Updating, let the animation finish
				//
				document.id('content').fade('out').addEvent('complete', function () {
					self.isRunning = this.updateDisplay.periodical(1000, self);
				});
			}
		});
	},

	// Setup the hover events
	//
	initHover: function () {
		document.getElements('.commandButton').addEvents({
			'mouseover': function (ele) {
				if (!this.hasClass('active')) {
					document.getElements('div.commandButton').removeClass('commandHover');
					this.addClass('commandHover');
				}
			},

			'mouseout': function () {
				document.getElements('div.commandButton').removeClass('commandHover');
			}
		});
	},

	// This gets called every second 
	// and decides what to update
	//
	updateDisplay: function () {
		var self = this;

		// Load the modules components and link
		//
		if (!this.loaded) {
			document.id('commands').set('html', this.modules.active.commands());

			document.id("commands").getElements("a").addEvent('click', function (e, ele) {
				self.modules.active.dispatch(this.innerHTML, self.modules.active);
			});
			this.loaded = true;
		}

		// Call all the tick functions in all the
		// modules (except the duplicate one 'active')
		//
		Object.each(this.modules, function (value, key) {
			if (key != 'active' && value.tick) {
				value.tick(value);
			}
		});

		// Update the display
		//
		document.id('content').set('html', this.modules.active.display(this.modules.active));
		document.id('content').fade('in');
	}
});

window.addEvent('domready', function () {
	var thisClock = new Clock();
});