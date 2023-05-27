import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  restaurant: null,
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
      // console.log('👉🏾', state.restaurant);
    },
  },
});

export const {setRestaurant} = restaurantSlice.actions;

export const selectRestaurant = state => state.restaurant?.restaurant;
// console.log(selectRestaurant);

export default restaurantSlice.reducer;
