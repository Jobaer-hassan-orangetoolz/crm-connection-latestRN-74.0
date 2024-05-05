import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

const CountDownSecond: React.FC = ({
  start,
  isActiveCall,
  onFinishedCallback,
  endVal,
}: any) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    let interval: any = 0;
    if (isActiveCall && count > 0) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      if (count >= endVal) {
        clearInterval(interval);
        onFinishedCallback();
      }
    }
    return () => clearInterval(interval);
  }, [count, isActiveCall]);
  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
};
const CallComponent = () => {
  const [active, setActive] = useState(false);
  const toggleIsActive = () => {
    setActive(!active);
  };
  const onfinish = () => {};
  return (
    <View>
      <CountDownSecond
        start={0}
        isActiveCall={active}
        onFinishedCallback={onfinish}
        endVal={20}
      />
      <Button title="End the call" onPress={toggleIsActive} />
    </View>
  );
};
export default CallComponent;
