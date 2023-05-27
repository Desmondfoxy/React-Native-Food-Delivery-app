import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {categoryData, restaurantData, userData} from '../data/dummyData';

export default function Home({navigation}) {
  const [user, setUser] = useState(userData);
  const [categories, setCategories] = useState(categoryData);
  const [selectedCat, setSelectedCat] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);

  const [refreshing, setRefreshing] = useState(false);

  const pullRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRestaurants(restaurantData);
    }, 2000);
  };

  // Header Section functionality
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          paddingVertical: SIZES.padding,
          // backgroundColor: 'red',
        }}>
        <View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text
              style={{
                ...FONTS.h3,
                marginRight: 5,
                textTransform: 'capitalize',
              }}>
              Hello,
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {user.lname}
            </Text>
          </View>
          <Text style={{color: COLORS.lightGray3}}>What do you want today</Text>
        </View>
        <View
          style={{
            padding: SIZES.padding * 0.4,
            borderColor: COLORS.primary,
            borderWidth: 1,
            borderRadius: 50,
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('User')}>
            <Image
              source={user.photo}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                // padding: SIZES.padding * 2,
                // borderColor: COLORS.primary,
                // borderWidth: 1,
                // borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Search Section functionality
  function renderSearch() {
    return (
      <View style={{marginTop: SIZES.padding * 3, flexDirection: 'row'}}>
        <TextInput
          placeholder="Searh for food "
          placeholderTextColor={COLORS.lightGray3}
          style={{
            backgroundColor: COLORS.lightGray,
            padding: 14,
            borderTopLeftRadius: SIZES.radius * 0.3,
            borderBottomLeftRadius: SIZES.radius * 0.3,
            flex: 1,
            letterSpacing: 1.2,
          }}
          selectionColor={COLORS.primary}
        />
        <View
          style={{
            backgroundColor: COLORS.primary,
            padding: 14,
            borderTopRightRadius: SIZES.radius * 0.3,
            borderBottomRightRadius: SIZES.radius * 0.3,
          }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{width: 20, height: 20, tintColor: COLORS.white}}
          />
        </View>
      </View>
    );
  }

  // Category Section Functionality
  function renderCatitem({item}) {
    const onSelectedCat = category => {
      // Filter Restaurant
      let restaurantList = restaurantData.filter(a =>
        a.categories.includes(category.id),
      );

      setRestaurants(restaurantList);
      setSelectedCat(category);
    };
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            selectedCat?.id == item.id ? COLORS.primary : COLORS.secondary,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginRight: SIZES.padding / 2,
          paddingRight: 30,
          padding: 5,
          // width: 130,
        }}
        onPress={() => onSelectedCat(item)}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 25,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{width: 25, height: 25}}
            alt={item.name}
          />
        </View>
        <Text
          style={{
            ...FONTS.body4,
            fontWeight: 'bold',
            color: selectedCat?.id == item.id ? COLORS.white : COLORS.primary,
            textTransform: 'capitalize',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  // Restaurants Section Functionality
  function renderRestaurantItem({item}) {
    const getCatNameById = id => {
      let category = categories.filter(a => a.id == id);

      if (category.length > 0) return category[0].name;

      return '';
    };
    return (
      <TouchableOpacity
        style={{paddingBottom: SIZES.padding}}
        onPress={() => navigation.navigate('Details', {item})}>
        <View>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 150,
              borderRadius: SIZES.radius * 0.3,
            }}
            alt={item.name}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 30,
              width: SIZES.width * 0.25,
              backgroundColor: COLORS.primary,
              borderTopRightRadius: SIZES.radius * 0.3,
              borderBottomLeftRadius: SIZES.radius * 0.3,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text
              style={{...FONTS.body3, fontWeight: 'bold', color: COLORS.white}}>
              {item.duration}
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...FONTS.body2,
            fontWeight: 'bold',
            // marginTop: SIZES.padding * 0.2,
          }}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 0.2,
            alignItems: 'baseline',
            marginBottom: 5,
          }}>
          <Image
            source={icons.star}
            alt=""
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
              marginRight: SIZES.padding,
            }}
          />
          <Text style={{...FONTS.body3, fontWeight: 'bold'}}>
            {item.rating}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            {item.categories.map(catId => {
              return (
                <View key={catId} style={{flexDirection: 'row'}}>
                  <Text style={{...FONTS.body3}}>{getCatNameById(catId)}</Text>
                  <Text
                    style={{
                      color: COLORS.darkgray,
                      ...FONTS.body3,
                      marginHorizontal: 4,
                    }}>
                    •
                  </Text>
                </View>
              );
            })}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={icons.delivery}
                style={{width: 30, height: 20, tintColor: COLORS.black}}
              />
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 4,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                  marginLeft: 2,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                  }}>
                  Free
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: SIZES.padding * 2}}>
        {renderHeader()}
        {renderSearch()}
        <View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={renderCatitem}
            contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
          />
        </View>
        <View style={{height: '75%'}}>
          <FlatList
            data={restaurants}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={renderRestaurantItem}
            contentContainerStyle={{
              // paddingHorizontal: SIZES.padding,
              paddingBottom: 30,
              flexGrow: 1,
            }}
            refreshing={refreshing}
            onRefresh={pullRefresh}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
