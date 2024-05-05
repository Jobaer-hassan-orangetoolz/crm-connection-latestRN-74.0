import React from 'react';
import {Text, View} from 'react-native';
import SplashContainer from '../../layouts/SplashContainer.layout';
import ImagePreview from '../../components/core/ImagePreview.core.component';
import {imageLink} from '../../assets/images/link.image.asset';
import Loading from '../../assets/lottie/Loading.lottie.asset';
import {titles} from '../../assets/js/titles.message';
import {styles} from './styles/splash.style';
import useSplash from './hooks/useSplash.hook';
const Splash = () => {
  const {} = useSplash();
  return (
    <SplashContainer containerStyle={styles.container}>
      {/* TODO: image dimension will be 236 * 45 */}
      <ImagePreview source={imageLink.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{titles.pleaseWait}</Text>
        <View style={styles.lottieContainer}>
          <Loading styles={styles.lottie} />
        </View>
      </View>
    </SplashContainer>
  );
};
export default Splash;
