const { google } = require('googleapis');
require('dotenv').config();
const Response = require('../utils/response');
const { OAuth2 } = google.auth;
// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CALENDAR_CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
// Google calendar API settings

const calendar = google.calendar({ version: "v3" });
const timeZone = "America/Bogota";
// Your TIMEOFFSET Offset
const TIMEOFFSET = '-05:00';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};


// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
    CREDENTIALS.client_id,
    CREDENTIALS.client_secret,
    CREDENTIALS.redirect_uris[0]
)


const createEvent = async (req, res) => {
    try {
        oAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
        const eventStartTime = new Date()
        // eventStartTime.setDate(eventStartTime.getDay() + 2)

        // Create a new event end date instance for temp uses in our calendar.
        const eventEndTime = new Date();
        console.log(eventStartTime);
        // eventEndTime.setDate(eventEndTime.getDay() + 4)
        // eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
        console.log(eventEndTime);
        const event = {
            summary: `Meeting with David`,
            description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
            colorId: 1,
            start: {
                dateTime: eventStartTime,
                timeZone,
            },
            end: {
                dateTime: eventEndTime,
                timeZone,
            },
            attendees: [{ email: req.user.email }]
        }
        let response = await calendar.events.insert({
            auth: oAuth2Client,
            calendarId: calendarId,
            resource: event
        });
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return Response.success(res, 'Event created succesfully', [], 201);
        } else {
            return Response.error(res, `Error at createEvent -->`, []);
        }
    } catch (error) {
        return Response.error(res, `Error at createEvent -->`, []);
    }
};

const getEvents = async (req, res) => {
    try {
        oAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
        const options = {
            auth: oAuth2Client,
            calendarId: calendarId,
            timeMin: dateTimeForCalander.startDate,
            timeMax: dateTimeForCalander.endDate,
            timeZone,
            q: req.user.email,
        };
        let response = await calendar.events.list(options);
        let items = response['data']['items'];
        return Response.success(res, 'Events getted succesfully', items, 201);
    } catch (error) {
        console.log(error);
        return Response.error(res, `Error at getEvents -->`, []);
    }
};

const deleteEvent = async (req, res) => {
    try {
        oAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
        let response = await calendar.events.delete({
            auth: oAuth2Client,
            calendarId: calendarId,
            eventId: req.body.eventId
        });
        // console.log(response);
        if (response.data === '') {
            return Response.success(res, 'Event deleted succesfully', [], 201);
        } else {
            return Response.error(res, `Error at getEvents -->`, []);

        }
    } catch (error) {
        return Response.error(res, `Error at deleteEvent -->`, []);
    }
};

module.exports = {
    deleteEvent,
    getEvents,
    createEvent
}
