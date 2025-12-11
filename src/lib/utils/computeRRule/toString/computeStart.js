import moment from "moment";

const computeStart = ({ onDate: { date, time, timezone, options } }) => {
  // verify that incoming date is valid
  // by seeing if it can be converted into a moment object.
  // if not, then create a new date
  let dateValue = date;
  if (!moment.isMoment(moment(dateValue))) {
    dateValue = moment().format("YYYY-MM-DD");
  }

  // Combine date and time if time is provided
  const timeValue = time || "00:00";
  const dateTimeString = `${dateValue}T${timeValue}:00`;

  const result = {
    dtstart: moment(dateTimeString).toDate(),
  };

  // Add timezone if provided and not hidden
  const hideTimezone = options && options.hideTimezone;
  if (timezone && !hideTimezone) {
    result.tzid = timezone;
  }

  return result;
};

export default computeStart;
