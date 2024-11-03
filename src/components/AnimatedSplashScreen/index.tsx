import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated, Easing} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AnimatedSplashScreen = ({onFinish}: {onFinish: () => void}) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const textFadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SplashScreen.hide();

    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(textFadeIn, {
        toValue: 1,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) {
        onFinish();
      }
    });
  }, [logoScale, textFadeIn, onFinish]);

  const animatedLogoStyle = {
    transform: [{scale: logoScale}],
    opacity: logoScale,
  };

  const animatedTopTextStyle = {
    opacity: textFadeIn,
    transform: [
      {
        translateY: textFadeIn.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  const animatedBottomTextStyle = {
    opacity: textFadeIn,
    transform: [
      {
        translateY: textFadeIn.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Animated.Text style={[styles.topText, animatedTopTextStyle]}>
          González Mauricio
        </Animated.Text>
        <Animated.Text style={[styles.topText, animatedTopTextStyle]}>
          D'agostino Leonel
        </Animated.Text>
        <Animated.Text style={[styles.topText, animatedTopTextStyle]}>
          Bartoncello Ricardo
        </Animated.Text>
      </View>
      <Animated.View style={[styles.iconContainer, animatedLogoStyle]}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.icon}
        />
      </Animated.View>
      <Animated.Text style={[styles.bottomText, animatedBottomTextStyle]}>
        PPS - 2024 - 2 - TuRestoApp
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#002B5B',
  },
  textContent: {
    gap: 16,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#FFF',
    borderRadius: 75,
    padding: 5,
    elevation: 10,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    width: 120,
    height: 120,
  },
  topText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-medium',
  },
  bottomText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#FFD700',
    fontFamily: 'sans-serif-light',
  },
});

export default AnimatedSplashScreen;
