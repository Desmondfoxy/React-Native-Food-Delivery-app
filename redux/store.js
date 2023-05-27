import {configureStore} from '@reduxjs/toolkit';
import basketSlice from './slices/basketSlice';
import restaurantSlice from './slices/restaurantSlice';

export default configureStore({
  reducer: {
    basket: basketSlice,
    restaurant: restaurantSlice,
  },
});
