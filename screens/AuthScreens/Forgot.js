import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, images} from '../../constants';

export default function Forgot({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: COLORS.lightGray,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 120,
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 100,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginVertical: 10,
          }}>
          <Image source={images.logo} style={{width: 200, height: 200}} />
        </View>
        <Text style={{...FONTS.h1, fontWeight: 'bold'}}>Forgot Password</Text>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.secondary,
            width: '100%',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginTop: SIZES.padding * 2,
            paddingVertical: 30,
            paddingHorizontal: 50,

            // height: 3500,
          }}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={COLORS.black}
            style={{
              backgroundColor: COLORS.white,
              padding: 15,
              borderRadius: SIZES.radius,
              marginBottom: 10,
              //   borderBottomColor: COLORS.primary,
              //   borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
              marginTop: SIZES.padding,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, fontWeight: 'bold'}}>
              Send
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: SIZES.padding,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginTop: SIZES.padding}}
              onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: COLORS.primary,
                  ...FONTS.body3,
                  fontWeight: 'bold',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
