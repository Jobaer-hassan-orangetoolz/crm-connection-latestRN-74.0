import React from 'react';
import {Text, View} from 'react-native';
import Loading from '../../assets/lottie/Loading.lottie.asset';
import {styles} from './styles/splash.style';
import {globalStyles} from '../../assets/styles/global.style.asset';
const Log = () => {
  return (
    <View
      containerStyle={[
        styles.container,
        globalStyles.flex1 /* {height: 100} */,
      ]}>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <Text style={[styles.text, {color: 'black'}]}>{'Log'}</Text>
      <View style={styles.lottieContainer}>
        <Loading styles={styles.lottie} />
      </View>
    </View>
  );
};
export default Log;
