import React from 'react';
import PropTypes from 'prop-types';
import { generateTimeOptions } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';

const TimeSelector = ({ id, time, timeStep, handleChange, translations }) => {
  const timeOptions = generateTimeOptions(timeStep);

  return (
    <div className="col-6 col-sm-3">
      <select
        id={`${id}-time`}
        name="start.onDate.time"
        className="form-control"
        value={time}
        aria-label={translateLabel(translations, 'start.time_tooltip')}
        onChange={handleChange}
      >
        {timeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

TimeSelector.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timeStep: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

TimeSelector.defaultProps = {
  timeStep: 15,
};

export default TimeSelector;
