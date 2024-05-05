/* eslint-disable radix */
import React from 'react';
import {useCountdown} from '../../../utilities/hooks/useCountdown.hook';
import {Text} from 'react-native';

const formatter = (value: any) => value;

const CountDown = ({
  startValue = 0,
  endValue = 60,
  increment = 1,
  callback = () => {},
  className = '',
  format = formatter,
  callbackOnEveryUpdate = () => {},
}: any) => {
  const newValue = useCountdown({
    startValue: parseInt(startValue),
    endValue: endValue,
    increment: parseFloat(increment),
    callback: callback,
    callbackOnEveryUpdate: callbackOnEveryUpdate,
  });
  return <Text style={className}>{format(newValue)}</Text>;
};
export default CountDown;

/*
props:
  startValue: number,
  endValue: number,
  increment: number,
  callback: function,
  className: string,
  format: function
*/
