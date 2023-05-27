import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {selectRestaurant} from '../redux/slices/restaurantSlice';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {emptyBasket} from '../redux/slices/basketSlice';

export default function Delivery({navigation}) {
  const restaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch();

  const cancelOrder = () => {
    navigation.navigate('Home');
    dispatch(emptyBasket());
  };
  return (
    <View style={{flex: 1}}>
      {/* Map View */}
      <MapView
        initialRegion={{
          latitude: restaurant.location.latitude,
          longitude: restaurant.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{flex: 1}}
        mapType="standard">
        <Marker
          coordinate={{
            latitude: restaurant.location.latitude,
            longitude: restaurant.location.longitude,
          }}
          title={restaurant.name}
          description={restaurant.duration}
          pinColor={COLORS.primary}
        />
      </MapView>
      <View
        style={{
          position: 'relative',
          backgroundColor: COLORS.secondary,
          // marginTop: -50,
          // height: 300,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding * 2,
            paddingTop: SIZES.padding,
          }}>
          <View>
            <Text style={{...FONTS.body3, fontWeight: 'bold'}}>
              Estimated Arrival
            </Text>
            <Text style={{...FONTS.h1, fontWeight: 'bold'}}>
              {restaurant.courier.duration}
            </Text>
            <Text style={{...FONTS.body3, fontWeight: 'bold'}}>
              Your order is own its way!
            </Text>
          </View>
          <Image
            source={icons.bikeGuy2}
            resizeMode="contain"
            style={{width: 120, height: 120}}
          />
        </View>
        {/* comfirm order */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            flexDirection: 'row',
            borderRadius: SIZES.padding * 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: SIZES.padding * 3,
            margin: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: COLORS.secondary,
              borderRadius: 50,
              padding: 3,
            }}>
            <Image
              source={images.deliveryGuy}
              resizeMode="cover"
              style={{width: '100%', height: '100%', borderRadius: 50}}
            />
          </View>
          <View style={{flex: 1, marginLeft: SIZES.padding}}>
            <Text
              style={{...FONTS.h3, fontWeight: 'bold', color: COLORS.white}}>
              {restaurant.courier.name}
            </Text>
            <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
              Your Rider
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginRight: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.padding * 5,
                padding: SIZES.padding,
              }}>
              <Text>📞</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.padding * 5,
                padding: SIZES.padding,
              }}
              onPress={cancelOrder}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
