/* global Class, Digital, Timer, document, clearInterval, console, window  */

var Clock = new Class({

	// Initalize the events, menu system 
	// and the timer
	//
	initialize: function () {
		this.initHover();
		this.initClick();

		// Load Views
		//
		this.Digital = new Digital();
		this.Timer = new Timer();

		// Start
		//
		this.selection = 'Digital';
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
				// link up the commands
				//
				self.loaded = false;
				self.selection = this.getAttribute('display-panel');

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

		switch (this.selection) {

		// Digital clock (js/digital.js)
		//
		case "Digital":
			document.id('content').set('html', this.Digital.display(this.Digital));

			if (!self.loaded) {
				document.id('commands').set('html', this.Digital.commands());
				console.log(document.id("commands").getElements("a"));

				document.id("commands").getElements("a").addEvent('click', function (e, ele) {
					self.Digital.dispatch(this.innerHTML, self.Digital);
				});
				this.loaded = true;
			}
			break;

		// Timer (js/timer.js)
		//
		case "Timer":
			document.id('content').set('html', this.Timer.display(this.Timer));

			if (!self.loaded) {
				document.id('commands').set('html', this.Timer.commands());
				console.log(document.id("commands").getElements("a"));

				document.id("commands").getElements("a").addEvent('click', function (e, ele) {
					self.Timer.dispatch(this.innerHTML, self.Timer);
				});
				this.loaded = true;
			}
			break;
		}
		document.id('content').fade('in');
	}
});

window.addEvent('domready', function () {
	var thisClock = new Clock();
});