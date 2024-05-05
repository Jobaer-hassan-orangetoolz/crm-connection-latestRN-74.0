/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

type endValue = number | '__infinite__';
// interface props {
//   startValue: number;
//   endValue: endValue;
//   increment: number;
//   callback: Function;
//   callbackOnEveryUpdate: Function;
// }

const useCountdown = ({
  startValue = 0,
  endValue = 60,
  increment = 1,
  callback = () => {},
  callbackOnEveryUpdate = () => {},
}: any) => {
  let endValueData: endValue = 60;
  if (endValue === '__infinite__') {
    endValueData = '__infinite__';
  } else {
    endValueData = endValue;
  }
  const [countDown, setCountDown] = useState<number>(startValue);
  useEffect(() => {
    let interval: any = 0;
    if (endValueData === '__infinite__') {
      interval = setInterval(() => {
        setCountDown(countDown + increment);
        callbackOnEveryUpdate(countDown + increment);
      }, 1000);
    } else {
      if (increment > 0 && startValue < endValue) {
        interval = setInterval(() => {
          setCountDown(countDown + increment);
          callbackOnEveryUpdate(countDown + increment);
        }, 1000);
        if (countDown >= endValue) {
          clearInterval(interval);
          setCountDown(endValue);
          callback();
        }
      } else if (increment < 0 && startValue > endValue) {
        interval = setInterval(() => {
          setCountDown(countDown + increment);
          callbackOnEveryUpdate(countDown + increment);
        }, 1000);
        if (countDown <= endValue) {
          clearInterval(interval);
          setCountDown(endValue);
          callback();
        }
      }
    }
    return () => clearInterval(interval);
  }, [countDown]);
  return countDown;
};
export {useCountdown};
