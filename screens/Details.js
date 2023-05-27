import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {initialCurrentLocation} from '../data/dummyData';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../redux/slices/basketSlice';
import Menu from '../components/Menu';
import {selectRestaurant, setRestaurant} from '../redux/slices/restaurantSlice';

export default function Details({route, navigation}) {
  const scrollX = new Animated.Value(0);
  // const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );
  // const [orderItems, setOrderItems] = useState([]);

  const restaurant = useSelector(selectRestaurant);
  // console.log('⭐️', restaurant);

  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  //   Item Quantity for each item in the basket
  // const itemCount = basketItems.reduce((a, b) => a + (b.qty || 0), 0);
  //   Total Price Item in the basket
  // const itemInBasket = useSelector(selectBasketItems);
  // const total = itemInBasket.reduce((a, b) => a + (b.total || 0), 0);

  // console.log('👉🏾', basketItems);
  let {item} = route.params;

  const cancelOrder = () => {
    navigation.goBack();
    dispatch(emptyBasket());
  };

  useEffect(() => {
    dispatch(
      setRestaurant({
        ...item,
      }),
    );
    // setRestaurant(item);
  }, []);

  // Get order Qty
  // function getOrderQty(menuId) {
  //   let orderItem = orderItems.filter(a => a.menuId == menuId);

  //   if (orderItem.length > 0) return orderItem[0].qty;

  //   return 0;
  // }

  // Add and remove order Qty
  // function editOrder(action, menuId, price) {
  //   let orderList = orderItems.slice();
  //   let item = orderList.filter(a => a.menuId == menuId);

  //   if (action == '+') {
  //     // Check if item is already added if not add it
  //     if (item.length > 0) {
  //       let newQty = item[0].qty + 1;
  //       item[0].qty = newQty;
  //       item[0].total = item[0].qty * price;
  //     } else {
  //       const newItem = {
  //         menuId: menuId,
  //         qty: 1,
  //         price: price,
  //         total: price,
  //       };
  //       orderList.push(newItem);
  //     }
  //     setOrderItems(orderList);
  //   } else {
  //     if (item.length > 0) {
  //       if (item[0]?.qty > 0) {
  //         let newQty = item[0].qty - 1;
  //         item[0].qty = newQty;
  //         item[0].total = newQty * price;
  //       }
  //     }
  //   }
  //   setOrderItems(orderList);
  // }

  // Get Basket Item Count
  // function getBasketItemCount() {
  //   let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
  //   return itemCount;
  // }

  // Sum up Order
  // function sumOrder() {
  //   let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
  //   return total.toFixed(2);
  // }

  // const orders = useSelector(state => state.order.order);
  // console.log(orders);

  function renderRestaurantDetail() {
    return (
      <>
        <View
          style={{
            position: 'relative',
            bottom: -40,
            zIndex: 1,
            backgroundColor: COLORS.primary,
            width: '50%',
            paddingHorizontal: SIZES.padding2,
            paddingVertical: SIZES.padding,
            borderTopRightRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            marginTop: -20,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white, fontWeight: 'bold'}}>
            {restaurant?.name}
          </Text>
        </View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {restaurant?.menu.map((item, index) => (
            // <View key={`mene-${index}`} style={{alignItems: 'center'}}>
            //   <View style={{height: SIZES.height * 0.35}}>
            //     <Image
            //       source={item.photo}
            //       resizeMode="cover"
            //       style={{width: SIZES.width, height: '100%'}}
            //     />
            //     <View
            //       style={{
            //         flexDirection: 'row',
            //         position: 'absolute',
            //         height: 50,
            //         width: SIZES.width,
            //         bottom: -20,
            //         justifyContent: 'center',
            //       }}>
            //       <TouchableOpacity
            //         style={{
            //           width: 50,
            //           backgroundColor: COLORS.secondary,
            //           justifyContent: 'center',
            //           alignItems: 'center',
            //           borderTopLeftRadius: 25,
            //           borderBottomLeftRadius: 25,
            //         }}
            //         activeOpacity={0.7}
            //         onPress={() => editOrder('-', item.menuId, item.price)}>
            //         <Text style={{...FONTS.body1}}>-</Text>
            //       </TouchableOpacity>
            //       <View
            //         style={{
            //           width: 50,
            //           backgroundColor: COLORS.secondary,
            //           justifyContent: 'center',
            //           alignItems: 'center',
            //         }}>
            //         <Text style={{...FONTS.body2}}>
            //           {getOrderQty(item.menuId)}
            //           {/* {basketItems.length} */}
            //         </Text>
            //       </View>
            //       <TouchableOpacity
            //         style={{
            //           width: 50,
            //           backgroundColor: COLORS.secondary,
            //           justifyContent: 'center',
            //           alignItems: 'center',
            //           borderTopRightRadius: 25,
            //           borderBottomRightRadius: 25,
            //         }}
            //         activeOpacity={0.7}
            //         onPress={() => editOrder('+', item.menuId, item.price)}>
            //         <Text style={{...FONTS.body1}}>+</Text>
            //       </TouchableOpacity>
            //     </View>
            //   </View>

            //   {/* Name, Price and Description */}
            //   <View
            //     style={{
            //       width: SIZES.width,
            //       alignItems: 'center',
            //       marginTop: 15,
            //       paddingHorizontal: SIZES.padding * 2,
            //       paddingVertical: SIZES.padding,
            //     }}>
            //     <Text
            //       style={{...FONTS.h2, fontWeight: 'bold', marginVertical: 10}}>
            //       {item.name} - {item.price.toFixed(2)}
            //     </Text>
            //     <Text style={{...FONTS.body3}}>{item.description}</Text>
            //   </View>
            //   <View
            //     style={{
            //       flexDirection: 'row',
            //       marginTop: 10,
            //       alignItems: 'center',
            //     }}>
            //     <Image source={icons.fire} style={{width: 20, height: 20}} />
            //     <Text
            //       style={{
            //         ...FONTS.body3,
            //         color: COLORS.darkgray,
            //         marginLeft: 10,
            //       }}>
            //       {item.calories.toFixed(2)} Cal
            //     </Text>
            //   </View>
            // </View>
            <Menu
              key={`mene-${index}`}
              id={item.menuId}
              name={item.name}
              photo={item.photo}
              description={item.description}
              price={item.price}
              calories={item.calories}
            />
          ))}
        </Animated.ScrollView>
      </>
    );
  }

  function renderOrderPart() {
    // Image dots
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
            {restaurant?.menu.map((item, index) => {
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
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                  }}
                />
              );
            })}
          </View>
        </View>
      );
    }
    return (
      <View style={{position: 'relative'}}>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.secondary,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h4, fontWeight: 'bold'}}>
              {/* {getBasketItemCount()} */}
              {basketItems.length}
              {/* {itemCount} */}
              &nbsp; Items in cart
            </Text>
            <Text style={{...FONTS.h4, fontWeight: 'bold'}}>
              {/* ${sumOrder()} */}
              {/* ${total.toFixed(2)} */}${basketTotal.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.body3}}>
                {currentLocation.streetName}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.body3}}>
                888888
              </Text>
            </View>
          </View>
          {basketItems.length ? (
            <View
              style={{
                padding: SIZES.padding * 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: SIZES.width * 0.9,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  borderRadius: SIZES.radius,
                }}
                onPress={() => navigation.navigate('Cart')}>
                <Text
                  style={{
                    ...FONTS.h2,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  View Cart
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        {isIphoneX() && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 34,
              backgroundColor: COLORS.primary,
            }}></View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={cancelOrder}>
          <Image source={icons.back} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        {/* <Text>Details page coming soons</Text> */}
      </View>
      {renderRestaurantDetail()}
      {renderOrderPart()}
    </SafeAreaView>
  );
}
