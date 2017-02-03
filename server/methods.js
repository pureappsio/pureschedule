// Import SendGrid
import sendgridModule from 'sendgrid';
const sendgrid = require('sendgrid')(Meteor.settings.sendGridAPIKey);

Meteor.methods({

    sendConfirmationEmail: function(meeting) {

        // Email text
        emailText = "<p>A new booking was made with " + meeting.name;
        emailText += " with the purpose " + meeting.purpose;
        emailText += " starting at  " + meeting.start;
        emailText += "</p>";

        emailText += "<p>The Skype of the person is: " + meeting.skype;
        emailText += " and email: " + meeting.email;
        emailText += '</p>';

        // Build mail
        var helper = sendgridModule.mail;
        from_email = new helper.Email("automated@schwartzindustries.com");
        to_email = new helper.Email("marcolivier.schwartz@gmail.com");
        subject = "New Meeting Booked";
        content = new helper.Content("text/html", emailText);
        mail = new helper.Mail(from_email, subject, to_email, content);

        mail.from_email.name = "PureSchedule";

        // Send
        var requestBody = mail.toJSON()
        var request = sendgrid.emptyRequest()
        request.method = 'POST'
        request.path = '/v3/mail/send'
        request.body = requestBody

        if (Meteor.settings.mode != 'demo') {
            sendgrid.API(request, function(err, response) {

                console.log('Email sent');

                if (err) { console.log(err); }

            });

        }


    },
    deleteMeeting: function(meetingId) {

        Meetings.remove(meetingId);

    },
    bookMeeting: function(meeting) {

        // var slotsDates = Meteor.call('generateSlotsDates');

        // for (s in slotsDates) {
        //     if (slotsDates[s].slotId == meeting.selectedSlot) {
        //         meeting.start = slotsDates[s].start;
        //         meeting.end = slotsDates[s].end;
        //     }
        // }

        console.log(meeting);

        Meetings.insert(meeting);

        Meteor.call('sendConfirmationEmail', meeting);

    },
    createSlot: function(slot) {

        console.log(slot);

        Slots.insert(slot);

    },
    deleteSlot: function(slotId) {
        Slots.remove(slotId);
    },
    generateSlotsDates: function() {

        // Slot length
        var length = 1;
        weeks = 3;

        // Current date
        var currentDate = new Date();

        // Slots
        var slots = Slots.find({}, { sort: { day: 1 } }).fetch();

        // console.log(slots);

        slotsDates = [];

        for (w = 0; w < weeks; w++) {
            for (s in slots) {

                referenceDate = moment(currentDate).add(w, 'weeks').toDate();
                slotDay = new Date(referenceDate.setDate(referenceDate.getDate() - referenceDate.getDay() + slots[s].day));
                minimumTime = 2 * 24 * 60 * 60 * 1000;

                // Check date
                if ((currentDate.getTime() - slotDay.getTime() + minimumTime) < 0) {

                    startHour = Meteor.call('convertHour', slots[s].startHour, slots[s].startPeriod);
                    endHour = Meteor.call('convertHour', slots[s].endHour, slots[s].endPeriod);

                    // Set date
                    startDate = new Date(slotDay.setHours(startHour, 0, 0, 0));
                    endDate = new Date(slotDay.setHours(endHour, 0, 0, 0));

                    var numberSlots = endDate.getHours() - startDate.getHours();

                    for (n = 0; n < numberSlots; n++) {

                        slotDate = {};

                        slotDate.slotId = w * 100 + s * 10 + n;

                        var slotStartDate = new Date();
                        slotStartDate.setTime(startDate.getTime());

                        var slotEndDate = new Date();
                        slotEndDate.setTime(startDate.getTime());

                        slotDate.start = new Date(slotStartDate.setHours(slotStartDate.getHours() + n * length));
                        slotDate.end = new Date(slotEndDate.setHours(slotEndDate.getHours() + n * length + 1));

                        // Check it's not taken
                        var meeting = Meetings.findOne({ start: slotDate.start });
                        if (!meeting) {
                            slotsDates.push(slotDate);
                        }

                    }
                }

            }
        }

        return slotsDates;

    },
    convertHour: function(hour, period) {

        if (period == 'am') {
            return hour;
        }
        if (period == 'pm') {
            return hour + 12;
        }

    }

});
