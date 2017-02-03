Meteor.publish("allSlots", function () {
	return Slots.find({});
});

Meteor.publish("allMeetings", function () {
	return Meetings.find({});
});

Meteor.publish("allUsers", function () {
	return Meteor.users.find({});
});