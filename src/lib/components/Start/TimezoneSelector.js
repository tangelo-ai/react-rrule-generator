import React, { Component } from 'react';
import PropTypes from 'prop-types';
import translateLabel from '../../utils/translateLabel';

// Full list of timezones with labels
const allTimezones = {
  'Pacific/Midway': 'Midway Island, Samoa',
  'Pacific/Honolulu': 'Hawaii',
  'America/Juneau': 'Alaska',
  'America/Boise': 'Mountain Time',
  'America/Dawson': 'Dawson, Yukon',
  'America/Chihuahua': 'Chihuahua, La Paz, Mazatlan',
  'America/Phoenix': 'Arizona',
  'America/Chicago': 'Central Time',
  'America/Regina': 'Saskatchewan',
  'America/Mexico_City': 'Guadalajara, Mexico City, Monterrey',
  'America/Belize': 'Central America',
  'America/Detroit': 'Eastern Time',
  'America/Bogota': 'Bogota, Lima, Quito',
  'America/Caracas': 'Caracas, La Paz',
  'America/Santiago': 'Santiago',
  'America/St_Johns': 'Newfoundland and Labrador',
  'America/Sao_Paulo': 'Brasilia',
  'America/Tijuana': 'Tijuana',
  'America/Montevideo': 'Montevideo',
  'America/Argentina/Buenos_Aires': 'Buenos Aires, Georgetown',
  'America/Godthab': 'Greenland',
  'America/Los_Angeles': 'Pacific Time',
  'Atlantic/Azores': 'Azores',
  'Atlantic/Cape_Verde': 'Cape Verde Islands',
  GMT: 'UTC',
  'Europe/London': 'Edinburgh, London',
  'Europe/Dublin': 'Dublin',
  'Europe/Lisbon': 'Lisbon',
  'Africa/Casablanca': 'Casablanca, Monrovia',
  'Atlantic/Canary': 'Canary Islands',
  'Europe/Belgrade': 'Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  'Europe/Sarajevo': 'Sarajevo, Skopje, Warsaw, Zagreb',
  'Europe/Brussels': 'Brussels, Copenhagen, Madrid, Paris',
  'Europe/Amsterdam': 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  'Africa/Algiers': 'West Central Africa',
  'Europe/Bucharest': 'Bucharest',
  'Africa/Cairo': 'Cairo',
  'Europe/Helsinki': 'Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
  'Europe/Athens': 'Athens',
  'Asia/Jerusalem': 'Jerusalem',
  'Africa/Harare': 'Harare, Pretoria',
  'Europe/Moscow': 'Istanbul, Minsk, Moscow, St. Petersburg, Volgograd',
  'Asia/Kuwait': 'Kuwait, Riyadh',
  'Africa/Nairobi': 'Nairobi',
  'Asia/Baghdad': 'Baghdad',
  'Asia/Tehran': 'Tehran',
  'Asia/Dubai': 'Abu Dhabi, Muscat',
  'Asia/Baku': 'Baku, Tbilisi, Yerevan',
  'Asia/Kabul': 'Kabul',
  'Asia/Yekaterinburg': 'Ekaterinburg',
  'Asia/Karachi': 'Islamabad, Karachi, Tashkent',
  'Asia/Kolkata': 'Chennai, Kolkata, Mumbai, New Delhi',
  'Asia/Kathmandu': 'Kathmandu',
  'Asia/Dhaka': 'Astana, Dhaka',
  'Asia/Colombo': 'Sri Jayawardenepura',
  'Asia/Almaty': 'Almaty, Novosibirsk',
  'Asia/Rangoon': 'Yangon Rangoon',
  'Asia/Bangkok': 'Bangkok, Hanoi, Jakarta',
  'Asia/Krasnoyarsk': 'Krasnoyarsk',
  'Asia/Shanghai': 'Beijing, Chongqing, Hong Kong SAR, Urumqi',
  'Asia/Kuala_Lumpur': 'Kuala Lumpur, Singapore',
  'Asia/Taipei': 'Taipei',
  'Australia/Perth': 'Perth',
  'Asia/Irkutsk': 'Irkutsk, Ulaanbaatar',
  'Asia/Seoul': 'Seoul',
  'Asia/Tokyo': 'Osaka, Sapporo, Tokyo',
  'Asia/Yakutsk': 'Yakutsk',
  'Australia/Darwin': 'Darwin',
  'Australia/Adelaide': 'Adelaide',
  'Australia/Sydney': 'Canberra, Melbourne, Sydney',
  'Australia/Brisbane': 'Brisbane',
  'Australia/Hobart': 'Hobart',
  'Asia/Vladivostok': 'Vladivostok',
  'Pacific/Guam': 'Guam, Port Moresby',
  'Asia/Magadan': 'Magadan, Solomon Islands, New Caledonia',
  'Asia/Kamchatka': 'Kamchatka, Marshall Islands',
  'Pacific/Fiji': 'Fiji Islands',
  'Pacific/Auckland': 'Auckland, Wellington',
  'Pacific/Tongatapu': "Nuku'alofa",
};

// Override some timezone labels for better readability
const timezoneOverrides = {
  'America/New_York': 'Eastern Time',
  'America/Anchorage': 'Alaska Time',
  'America/Denver': 'Mountain Time',
  'America/Los_Angeles': 'Pacific Time',
  'America/Mazatlan': 'Chihuahua, La Paz, Mazatlan',
  'Europe/Lisbon': 'Lisbon',
  'Asia/Tashkent': 'Islamabad, Karachi, Tashkent',
  'Asia/Kolkata': 'Chennai, Kolkata, Mumbai, New Delhi',
  'Pacific/Port_Moresby': 'Guam, Port Moresby',
  'America/Argentina/Buenos_Aires': 'Buenos Aires',
};

// Timezones to remove
const timezonesToRemove = [
  'America/Detroit',
  'America/Juneau',
  'America/Boise',
  'America/Dawson',
  'America/Chihuahua',
  'America/Belize',
  'GMT',
  'Atlantic/Canary',
  'Europe/Sarajevo',
  'Asia/Karachi',
  'Asia/Colombo',
  'Asia/Rangoon',
  'Pacific/Guam',
  'Pacific/Tongatapu',
  'America/Buenos_Aires',
  'America/Godthab',
];

// Get UTC offset for a timezone
const getTimezoneOffset = (timeZone) => {
  try {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone }));
    const offset = (tzDate - utcDate) / (1000 * 60);

    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';

    return 'GMT' + sign + String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
  } catch (e) {
    return 'GMT+00:00';
  }
};

// Build the cleaned timezone list
const buildTimezoneOptions = () => {
  const timezones = Object.assign({}, allTimezones, timezoneOverrides);

  // Remove unwanted timezones
  timezonesToRemove.forEach((tz) => {
    delete timezones[tz];
  });

  // Build options with offset labels
  const options = Object.keys(timezones).map((value) => {
    const label = timezones[value];
    const offset = getTimezoneOffset(value);
    return {
      value: value,
      label: '(' + offset + ') ' + label,
      offset: offset,
    };
  });

  // Sort by offset
  options.sort((a, b) => {
    const offsetA = a.offset.replace('GMT', '').replace(':', '.');
    const offsetB = b.offset.replace('GMT', '').replace(':', '.');
    return parseFloat(offsetA) - parseFloat(offsetB);
  });

  return options;
};

// Build options once at module load
const TIMEZONE_OPTIONS = buildTimezoneOptions();

class TimezoneSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.timezone || '',
    };
    this.onTimezoneChange = this.onTimezoneChange.bind(this);
  }

  componentDidMount() {
    const { selectedValue } = this.state;
    const { handleChange } = this.props;

    // Set default timezone to browser's timezone if not set
    if (!selectedValue) {
      try {
        const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const exists = TIMEZONE_OPTIONS.find((opt) => opt.value === browserTimezone);
        if (exists) {
          this.setState({ selectedValue: browserTimezone });
          handleChange({
            target: {
              value: browserTimezone,
              name: 'start.onDate.timezone',
            },
          });
        }
      } catch (e) {
        // Fallback - do nothing
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { timezone } = this.props;
    const { selectedValue } = this.state;

    if (timezone && timezone !== prevProps.timezone && timezone !== selectedValue) {
      this.setState({ selectedValue: timezone });
    }
  }

  onTimezoneChange(e) {
    const value = e.target.value;
    this.setState({ selectedValue: value });

    this.props.handleChange({
      target: {
        value: value,
        name: 'start.onDate.timezone',
      },
    });
  }

  render() {
    const { id, translations } = this.props;
    const { selectedValue } = this.state;

    return (
      <div className="col-12 col-sm-4 mt-2 mt-sm-0">
        <select
          id={id + '-timezone'}
          name="start.onDate.timezone"
          className="form-control"
          value={selectedValue}
          aria-label={translateLabel(translations, 'start.timezone_tooltip')}
          onChange={this.onTimezoneChange}
        >
          <option value="">Select timezone...</option>
          {TIMEZONE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

TimezoneSelector.propTypes = {
  id: PropTypes.string.isRequired,
  timezone: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

TimezoneSelector.defaultProps = {
  timezone: '',
};

export default TimezoneSelector;
