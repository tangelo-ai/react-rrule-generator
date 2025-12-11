export const DATE_TIME_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm";
export const DATE_TIME_FULL_FORMAT = "YYYY-MM-DDTHH:mm:ss";

// Convert 24-hour time to 12-hour format
export const convert24HourTo12Hour = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Generate array of time options with given step (in minutes)
export const generateTimeOptions = (step = 15) => {
  const totalMinutes = 24 * 60;
  const times = Array(Math.floor(totalMinutes / step));
  return Array.from(times.keys()).map((key) => {
    const minutes = key * step;
    const hour = Math.floor(minutes / 60).toString();
    const minute = (minutes % 60).toString();
    const time = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    return {
      value: time,
      label: convert24HourTo12Hour(time),
    };
  });
};

export const DEFAULT_TIME = "09:00";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Day",
  "Weekday",
  "Weekend day",
];
