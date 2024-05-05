// import React from 'react';
// import {Text, View} from 'react-native';
// import useCountDown from './useCountDown.hook';
// const CountDown: React.FC<any> = ({
//   start = 0,
//   end = 10,
//   increment = 1,
//   callBack = () => {},
//   callBackRegular = () => {},
// }) => {
//   const {newVal} = useCountDown(
//     (start = start),
//     (end = end),
//     (increment = increment),
//     (callBack = callBack),
//     (callBackRegular = callBackRegular),
//   );
//   console.log('new value from countdown', newVal);
//   return (
//     <View style={{height: 50}}>
//       <Text style={{fontSize: 30}}>{newVal}</Text>
//     </View>
//   );
// };
// export default CountDown;
import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

const CountdownTimer = ({initialSeconds, onTimeExpired}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeExpired();
    }
  }, [seconds, onTimeExpired]);
  const handleCall = () => {};
  return (
    <View>
      <Text>Countdown: {seconds} seconds</Text>
      <Button title="Cancell Call" onPress={handleCall} />
    </View>
  );
};

const YourCallScreen = () => {
  const handleTimeExpired = () => {
    // Handle actions when the countdown reaches 0
  };

  return (
    <View>
      <Text>Your Call Screen Content</Text>
      <CountdownTimer initialSeconds={300} onTimeExpired={handleTimeExpired} />
      {/* You can add other UI elements or components */}
    </View>
  );
};

export default YourCallScreen;
