/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from 'react';

function useDelay(callback, array, duration = 1000) {
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => {
      callback();
    }, duration);

    return () => {
      clearTimeout(timer.current);
    };
  }, array);

  return null;
}

export default useDelay;
