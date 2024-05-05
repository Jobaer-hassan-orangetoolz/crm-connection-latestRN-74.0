/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

const useCountDown = (
  start: number,
  end: number,
  increment: number,
  callBack: Function,
  callBackRegular: Function,
) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    let interval: any = 0;
    if (start < end) {
      interval = setInterval(() => {
        setCount(count + increment);
        callBackRegular();
      }, 1000);
      if (count >= end) {
        clearInterval(interval);
        callBack();
      }
    }
    return () => clearInterval(interval);
  }, [count]);
  return {count};
};
export default useCountDown;
