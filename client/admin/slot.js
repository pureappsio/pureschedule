Template.slot.events({

    'click .delete-slot': function() {

        Meteor.call('deleteSlot', this._id);

    }

});