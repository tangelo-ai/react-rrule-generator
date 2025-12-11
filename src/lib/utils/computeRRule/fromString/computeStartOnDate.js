const computeStartOnDate = (data, rruleObj) => {
  if (!rruleObj.dtstart) {
    return data.start.onDate.date;
  }

  return rruleObj.dtstart;
};

const computeStartTime = (data, rruleObj) => {
  if (!rruleObj.dtstart) {
    return data.start.onDate.time || "09:00";
  }

  const dtstart = rruleObj.dtstart;
  const hours = dtstart.getHours().toString().padStart(2, "0");
  const minutes = dtstart.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const computeStartTimezone = (data, rruleObj) => {
  // Check if tzid is present in the rrule options
  if (rruleObj.tzid) {
    return rruleObj.tzid;
  }

  return data.start.onDate.timezone || "";
};

export default computeStartOnDate;
export { computeStartTime, computeStartTimezone };
