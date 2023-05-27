import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectRestaurant} from '../redux/slices/restaurantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../redux/slices/basketSlice';
import Lottie from 'lottie-react-native';

export default function Cart({navigation}) {
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const [groupedItems, setGroupedItems] = useState({});
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  useEffect(() => {
    const items = basketItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [basketItems]);
  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Button */}
      <View
        style={{
          paddingHorizontal: SIZES.padding * 2,
          padding: SIZES.padding2 * 2,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Text style={{...FONTS.body2, fontWeight: 'bold'}}>Your Cart</Text>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: 'bold',
                color: COLORS.lightGray2,
              }}>
              {restaurant.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Delivery Time */}
      <View
        style={{
          backgroundColor: COLORS.secondary,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 3,
        }}>
        <Image
          source={restaurant.courier.avatar}
          resizeMode="cover"
          style={{width: 90, height: 90}}
        />
        <Text style={{...FONTS.body3, paddingHorizontal: SIZES.padding}}>
          Deliver in {restaurant.courier.duration}
        </Text>
      </View>

      {/* Cart items */}
      {basketItems.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}>
          {Object.entries(groupedItems).map(([key, items]) => {
            let cart = items[0];
            return (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: SIZES.padding,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: SIZES.padding * 0.1,
                  // backgroundColor: COLORS.lightGray,
                  paddingVertical: SIZES.padding,
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: 'bold',
                    // marginRight: SIZES.padding * 0.2,
                    ...FONTS.body3,
                  }}>
                  {items.length} x
                </Text>
                <Image
                  source={cart.photo}
                  resizeMode="cover"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    marginLeft: 10,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    paddingHorizontal: 10,
                    // backgroundColor: 'red',
                    // width: 220,
                    flex: 1,
                  }}
                  numberOfLines={1}>
                  {cart.name}
                </Text>
                <Text style={{marginRight: 10, width: 50, fontWeight: 'bold'}}>
                  ${cart.price.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    backgroundColor: COLORS.primary,
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                  onPress={() => dispatch(removeFromBasket({id: cart.id}))}>
                  <Text
                    style={{
                      ...FONTS.body1,
                      color: COLORS.white,
                      lineHeight: 31,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            width: '100%',
            height: '62%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Lottie
            source={require('../assets/animation/empty.json')}
            autoPlay
            style={{width: 300, height: 300}}
          />
          <Text style={{...FONTS.body2, fontWeight: 'bold'}}>
            Your Cart is empty
          </Text>
          <Text>
            <Text>Go back to start Ordering</Text>
          </Text>
        </View>
      )}
      {/* <View style={{width: SIZES.width, height: SIZES.height}}>
        <Lottie source={require('../assets/animation/empty.json')} autoPlay />
      </View> */}

      {/* Total View */}

      <View
        style={{
          gap: 10,
          backgroundColor: COLORS.secondary,
          paddingVertical: SIZES.padding * 3,
          paddingHorizontal: SIZES.padding * 3,
          justifyContent: 'space-between',
          borderTopColor: COLORS.primary,
          borderTopWidth: 2.5,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: COLORS.lightGray3}}>Subtotal</Text>
          <Text style={{color: COLORS.lightGray3}}>
            ${basketTotal.toFixed(2)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: COLORS.lightGray3}}>Delivery Fee</Text>
          <Text style={{color: COLORS.lightGray3}}>
            ${restaurant.courier.fee.toFixed(2)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{...FONTS.body3, fontWeight: 'bold'}}>Order Total</Text>
          <Text style={{...FONTS.body3, fontWeight: 'bold'}}>
            ${(restaurant.courier.fee + basketTotal).toFixed(2)}
          </Text>
        </View>
        {basketItems.length ? (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: SIZES.padding * 1.5,
              marginTop: SIZES.padding,
            }}
            onPress={() => navigation.navigate('Order')}>
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: 'bold',
                color: COLORS.white,
              }}>
              Place Order
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}
