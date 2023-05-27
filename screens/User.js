import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

export default function User({navigation}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="X" onPress={() => navigation.goBack()} />
      <Text>User</Text>
    </SafeAreaView>
  );
}
