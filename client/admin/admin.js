Template.admin.events({

    'click #create-slot': function() {

    	slot = {
    		day: parseInt($('#day :selected').val()),
    		startHour: parseInt($('#start-hour :selected').val()),
    		startPeriod: $('#start-period :selected').val(),
    		endHour: parseInt($('#end-hour :selected').val()),
    		endPeriod: $('#end-period :selected').val()
    	}

        Meteor.call('createSlot', slot);

    },
    'click #generate-slots': function() {
        Meteor.call('generateClientSlots');
    }

});

Template.admin.helpers({

    slots: function() {
        return Slots.find({});
    },
    meetings: function() {
        return Meetings.find({});
    }

});
