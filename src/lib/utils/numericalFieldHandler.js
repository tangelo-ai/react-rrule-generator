import { isNaN } from 'lodash';

const numericalFieldHandler = (callback, minValue) => (event) => {
  // Convert input from a string to a number
  let inputNumber = +event.target.value;
  // Check if is a number and is less than 1000
  if (isNaN(inputNumber) || inputNumber >= 1000) return;

  if (typeof minValue === 'number' && inputNumber < minValue) {
    inputNumber = minValue;
  }

  const editedEvent = { target: { value: inputNumber, name: event.target.name } };
  callback(editedEvent);
};

export default numericalFieldHandler;
