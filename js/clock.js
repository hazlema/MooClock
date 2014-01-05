/* global Class, Digital, Timer, document, clearInterval, console, window, Fx  */

var Clock = new Class({

	// Initalize the events, menu system 
	// and the timer
	//
	initialize: function () {

		// Load Modules
		//
		this.modules = {
			'Digital': new Digital(),
			'Timer': new Timer()
		};

		// Wire the events and the hovers
		// then load the first module and start the app
		// but first let us pause for a word from our
		// sponser
		//
		(function () {
			this.initHover();
			this.initClick();
			this.activateModule();
			this.tick.periodical(1000, this);
		}.bind(this)).delay(2000);
	},
	
	// Setup the click events
	//
	initClick: function () {
		document.getElements('.commandButton').addEvent('click', function (e) {
			e.stopPropagation();

			if (!e.target.hasClass('active')) {
				document.getElements('div.commandButton').removeClass('active');
				e.target.addClass('active');
				this.activateModule(e.target.getAttribute('display-panel'));
			}
		}.bind(this));
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

	// Called every second
	//
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
		if (this.renderDisplay) {
			document.id('content').set('html', this.modules.active.display(this.modules.active));
		}
	},

	// Fade out the div then load the new content
	// and fade it back in. (Without stoping the timer)
	//
	activateModule: function (moduleName) {
		var self = this;
		
		var start = function () {
			self.renderDisplay = false;
		};
		
		var complete = function () {
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
			
			new Fx.Morph(document.id('content'), {
				transition: 'Sine:in',
				duration: 250,
				link: 'chain'
			}).start({'opacity': 1, 'font-size': '140px'});
		};
					
		var fxFadeOut = new Fx.Morph(document.id('content'), {
			transition: 'Sine:out',
			duration: 250,
			link: 'chain',
			onStart: start,
			onComplete: complete
		});
		
		fxFadeOut.start({'opacity': 0, 'font-size': '50px'});
	}
});

window.addEvent('domready', function () {
	var thisClock = new Clock();
});
