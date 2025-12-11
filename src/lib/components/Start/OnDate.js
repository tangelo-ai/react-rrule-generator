import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'react-datetime';
import 'moment/min/locales';

import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';
import TimeSelector from './TimeSelector';
import TimezoneSelector from './TimezoneSelector';

const StartOnDate = ({ id, onDate: { date, time, timezone, options }, handleChange, translations }) => {
  const CustomCalendar = options.calendarComponent;
  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const hideTime = options.hideTime || false;
  const hideTimezone = options.hideTimezone || false;
  const timeStep = options.timeStep || 15;
  const hideCalendar = options.hideCalendar || false;

  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'start.tooltip'),
    value: date,
    dateFormat: DATE_TIME_FORMAT,
    locale,
    readOnly: true,
  };

  return (
    <React.Fragment>
      {!hideCalendar && (
        <div className="col-6 col-sm-3">
          {CustomCalendar ? (
            <CustomCalendar
              key={`${id}-calendar`}
              {...calendarAttributes}
              onChange={(event) => {
                const editedEvent = {
                  target: {
                    value: event.target.value,
                    name: 'start.onDate.date',
                  },
                };

                handleChange(editedEvent);
              }}
            />
          ) : (
            <DateTime
              {...calendarAttributes}
              inputProps={{
                id: `${id}-datetime`,
                name: 'start.onDate.date',
                readOnly: true,
              }}
              locale={translateLabel(translations, 'locale')}
              timeFormat={false}
              viewMode="days"
              closeOnSelect
              closeOnTab
              required
              onChange={(inputDate) => {
                const editedEvent = {
                  target: {
                    value: moment(inputDate).format(DATE_TIME_FORMAT),
                    name: 'start.onDate.date',
                  },
                };

                handleChange(editedEvent);
              }}
            />
          )}
        </div>
      )}
      {!hideTime && (
        <TimeSelector
          id={id}
          time={time || '09:00'}
          timeStep={timeStep}
          handleChange={handleChange}
          translations={translations}
        />
      )}
      {!hideTimezone && (
        <TimezoneSelector id={id} timezone={timezone} handleChange={handleChange} translations={translations} />
      )}
    </React.Fragment>
  );
};

StartOnDate.propTypes = {
  id: PropTypes.string.isRequired,
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    timezone: PropTypes.string,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
      calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
      hideTime: PropTypes.bool,
      hideTimezone: PropTypes.bool,
      timeStep: PropTypes.number,
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default StartOnDate;
