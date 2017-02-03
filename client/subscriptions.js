// Tracker
Tracker.autorun(function() {
	Meteor.subscribe('allMeetings');
    Meteor.subscribe('allSlots');
    Meteor.subscribe('allUsers');
});