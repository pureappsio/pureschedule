Template.clientSlot.helpers({

	slotDay: function() {
		return moment(this.start).format('MMMM Do YYYY');
	},
	slotStart: function() {
		return moment(this.start).format('h a');
	},
	slotEnd: function() {
		return moment(this.end).format('h a');
	}
  
});

Template.clientSlot.events({

	'click .slot-select': function(event, template) {

		// Set all inactive
		$('.slot-select').removeClass('active');

		// Set active
		$('#' + this.slotId).addClass('active');

		Session.set('selectedSlot', this.slotId);

	}
})