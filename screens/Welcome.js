import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {welcomeData} from '../data/dummyData';
import {COLORS, FONTS, SIZES} from '../constants';

export default function Welcome({navigation}) {
  const [welcomeImg, setWelcomeImg] = useState(welcomeData);
  const scrollX = new Animated.Value(0);

  function renderWelcomeImg() {
    return (
      <View style={{height: '60%'}}>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {welcomeImg?.map((item, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  height: SIZES.height,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 0,
                  marginTop: 0,
                }}>
                <Image
                  source={item.photo}
                  resizeMode="contain"
                  style={{width: SIZES.width}}
                />
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }

  function renderDots() {
    dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {welcomeImg.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderWelcomeInfo() {
    return (
      <View
        style={{
          position: 'relative',
          //   backgroundColor: 'yellow',
          //   height: SIZES.height,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text
            style={{
              ...FONTS.h1,
              textTransform: 'capitalize',
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            delicious food
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray3,
              width: 230,
              textAlign: 'center',
              marginBottom: 30,
            }}>
            We help you to find best and delicious food
          </Text>
        </View>
        {renderDots()}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SIZES.padding * 3,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              width: SIZES.width * 0.5,
              padding: SIZES.padding * 2,
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              get started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView>
      {renderWelcomeImg()}
      {renderWelcomeInfo()}
    </SafeAreaView>
  );
}
