Template.meeting.events({

    'click .delete-meeting': function() {

        Meteor.call('deleteMeeting', this._id);

    }

});