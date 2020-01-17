const models = require('../models');

module.exports = {
  dates: {
    getDaysOfWeek: (req, res) => {
      let params = [req.query.weekId];
      models.dates.get(params, (err, results) => {
        if (err) {
          console.log(err.message);
        }
        res.send(results);
      });
    }
  },
  events: {
    getEvents: (req, res) => {
      let events;
      let params = [parseInt(req.query.userId), parseInt(req.query.dateId)];
      models.events.get(params, (err, results) => {
        if (err) {
          console.log(err.message);
        }
        events = results;
        let params = [
          'weekly',
          parseInt(req.query.dayId),
          parseInt(req.query.dateId)
        ];
        models.weeklyEvents.get(params, (err, results) => {
          if (err) {
            console.log(err.message);
          }
          events = [...events, ...results];
          let params = [
            'monthly',
            req.query.dayNumberOfMonth,
            parseInt(req.query.dateId)
          ];
          models.monthlyEvents.get(params, (err, results) => {
            if (err) {
              console.log(err.message);
            }
            events = [...events, ...results];
            res.send(events);
          });
        });
      });
    }
  },
  event: {
    getEvent: (req, res) => {
      let params = [req.body.eventId];
      models.event.get(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.send(result);
        }
      });
    },
    addEvent: (req, res) => {
      let params = [
        req.body.title,
        req.body.startTime,
        req.body.endTime,
        req.body.repeat,
        req.body.dayId,
        req.body.dayNumberOfMonth,
        req.body.userId,
        req.body.dateId,
        req.body.weekId
      ];
      models.event.post(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('event added');
          res.end();
        }
      });
    },
    editEvent: (req, res) => {
      let params = [
        req.body.title,
        req.body.startTime,
        req.body.endTime,
        req.body.repeat,
        req.body.dayId,
        req.body.dayNumberOfMonth,
        req.body.userId,
        req.body.dateId,
        req.body.weekId,
        req.body.id
      ];
      models.event.put(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('event edited');
          res.end(result);
        }
      });
    },
    deleteEvent: (req, res) => {
      let params = [req.query.eventId];
      models.event.delete(params, err => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('event deleted');
          res.end();
        }
      });
    }
  },
  users: {
    getAllUsers: (req, res) => {
      models.users.get((err, results) => {
        if (err) {
          console.log(err.messages);
        } else {
          res.send(results);
        }
      });
    }
  },
  user: {
    getUser: (req, res) => {
      let params = [req.query.email];
      models.user.get(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.send(result);
        }
      });
    },
    addUser: (req, res) => {
      let params = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.workDayStartTime,
        req.body.workDayEndTime
      ];
      models.user.post(params, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('user added');
          res.send(result);
        }
      });
    }
  }
};
