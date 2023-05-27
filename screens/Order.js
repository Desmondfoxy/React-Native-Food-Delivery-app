import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {icons} from '../constants';

export default function Order({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={icons.delivery2}
        resizeMode="contain"
        style={{width: '80%', height: '80%'}}
      />
    </View>
  );
}
