Template.dashboard.events({

    'click #book': function() {

        skype = $('#skype').val();
        name = $('#name').val();
        email = $('#email').val();
        purpose = $('#purpose').val();
        start = $('#start-' + Session.get('selectedSlot')).text();
        end = $('#end-' + Session.get('selectedSlot')).text();

        if (skype != "" && name != "" && email != "" && purpose != "") {

        	var meetingData = {
        		skype: skype,
        		name: name,
        		email: email,
        		purpose: purpose,
        		start: new Date(start),
        		end: new Date(end)
        	}

            Meteor.call('bookMeeting', meetingData, function(err, data) {

            	location.href = "/confirmed";

            });
        }

    }

});

Template.dashboard.helpers({

    slots: function() {
        return Session.get('slots');
    },
    slotSelected: function() {
        if (Session.get('selectedSlot')) {
            return true;
        } else {
            return false;
        }
    }

});

Template.dashboard.onRendered(function() {

    Meteor.call('generateSlotsDates', function(err, data) {
        Session.set('slots', data);
    });

});
