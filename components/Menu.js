import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsById,
} from '../redux/slices/basketSlice';

export default function Menu({id, name, description, photo, calories, price}) {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => selectBasketItemsById(state, id));
  const basketItems = useSelector(state => selectBasketItemsById(state, id));
  //   Item Quantity for each item in the basket
  const itemCount = basketItems.reduce((a, b) => a + (b.qty || 0), 0);

  const addToCart = () => {
    dispatch(addToBasket({id, name, price, photo}));
  };
  const removeFromCart = () => {
    dispatch(removeFromBasket({id}));
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{height: SIZES.height * 0.35}}>
        <Image
          source={photo}
          resizeMode="cover"
          style={{width: SIZES.width, height: '100%'}}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            height: 50,
            width: SIZES.width,
            bottom: -20,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
            }}
            activeOpacity={0.7}
            disabled={!totalItems.length}
            onPress={removeFromCart}>
            <Text style={{...FONTS.body1}}>-</Text>
          </TouchableOpacity>
          <View
            style={{
              width: 50,
              backgroundColor: COLORS.secondary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.body2}}>
              {/* {getOrderQty(item.menuId)} */}
              {totalItems.length}
              {/* {itemCount} */}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
            }}
            activeOpacity={0.7}
            onPress={addToCart}>
            <Text style={{...FONTS.body1}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Name, Price and Description */}
      <View
        style={{
          width: SIZES.width,
          alignItems: 'center',
          marginTop: 15,
          paddingHorizontal: SIZES.padding * 2,
          paddingVertical: SIZES.padding,
        }}>
        <Text style={{...FONTS.h2, fontWeight: 'bold', marginVertical: 10}}>
          {name} - {price.toFixed(2)}
        </Text>
        <Text style={{...FONTS.body3}}>{description}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Image source={icons.fire} style={{width: 20, height: 20}} />
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.darkgray,
            marginLeft: 10,
          }}>
          {calories.toFixed(2)} Cal
        </Text>
      </View>
    </View>
  );
}
