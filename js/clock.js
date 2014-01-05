/* global Class, Digital, Timer, document, clearInterval, console, window, Fx  */

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

		// Set the loaded flag 
		// Start the timer
		//
		this.renderDisplay = true;
		this.activateModule();

		this.isRunning = this.tick.periodical(1000, this);
	},

	// Setup the click events
	//
	initClick: function () {
		var self = this;

		document.getElements('.commandButton').addEvent('click', function (e) {
			e.stopPropagation();

			if (!this.hasClass('active')) {
				document.getElements('div.commandButton').removeClass('active');
				this.addClass('active');
				self.activateModule(this.getAttribute('display-panel'));
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

	tick: function () {

		// Call all the tick functions in all the
		// modules (except the duplicate one 'active')
		//
		Object.each(this.modules, function (value, key) {
			if (key != 'active' && value.tick) {
				value.tick(value);
			}
		});

		// If we are updating the screen or waiting
		// for an animation to finish
		//
		//if (this.renderDisplay) {
			document.id('content').set('html', this.modules.active.display(this.modules.active));
		//}
	},

	activateModule: function (moduleName) {
		var self = this,
			fxfad = new Fx.Morph(document.id('content'), {
				transition: 'quart:out',
				duration: 500,
				link: 'chain',
				onStart: function () {
					self.renderDisplay = false;
				},
				onComplete: function () {
					if (typeof moduleName == 'undefined') {
						self.modules.active = Object.values(self.modules)[0];
					} else {
						// Search for module
						//
						Object.each(self.modules, function (value, key) {
							if (key == moduleName) {
								self.modules.active = value;
							}
						});
					}

					// Update and wire modules commands
					//
					document.id('commands').set('html', self.modules.active.commands());
					document.id("commands").getElements("a").addEvent('click', function (e, ele) {
						self.modules.active.dispatch(this.innerHTML, self.modules.active);
					});

					self.modules.active.display(self.modules.active);
					self.renderDisplay = true;
					document.id('content').set('html', self.modules.active.display(self.modules.active));
					document.id('content').fade('in');
					console.log('Rendering: on');
				}
			});

		fxfad.start({
			'opacity': 0
		});
	}
});

window.addEvent('domready', function () {
	var thisClock = new Clock();
});