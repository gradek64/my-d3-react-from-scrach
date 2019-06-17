/**
 * Created by Sergiu Ghenciu on 08/12/2017
 */


const eventsExec = () => {
  const events = {};
  console.log('events called');

  const on = function (id, callback) {
    if (!callback || typeof callback !== 'function') {
      console.warn('You must pass a function as the second argument to events.on()');
    }

    if (events[id] === undefined) {
      events[id] = [];
    }
    events[id].push(callback);

    console.log('inside events', events);
  };

  const off = function (id, callback) {
    console.log('..off called');
    if (events[id]) {
      for (let i = 0; i < events[id].length; i++) {
        if (events[id][i] === callback) {
          events[id].splice(i, 1);
          break;
        }
      }
    }
  };

  const emit = function (id, payload) {
    if (events[id] && events[id].length) {
      console.log(
        'PLACE THAT EVENT IS DISPATCHED AND CALLBACK FUNCTION CALLED',
        events[id],
      );
      events[id].forEach(callback => callback(payload));
    }
  };

  return {
    on, off, emit, events,
  };
};

export default eventsExec();

