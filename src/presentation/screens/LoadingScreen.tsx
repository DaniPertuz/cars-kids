import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../hooks';
import { globalStyles } from '../styles/global.styles';

export const LoadingScreen = () => {
  const { background } = useCustomTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateScale = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.8,
          duration: 1200,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true
        }),
      ])
    );

    animateScale.start();

    return () => animateScale.stop();
  }, [scaleAnim]);

  return (
    <Layout style={[globalStyles.flexAlignJustifyCenter, background]}>
      <Animated.Image
        source={require('../../assets/carkids-removebg.png')}
        style={[{ height: 170, width: 200 }, background, { transform: [{ scale: scaleAnim }] }]}
      />
    </Layout>
  );
};
