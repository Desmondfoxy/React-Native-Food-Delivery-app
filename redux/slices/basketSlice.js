import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
      //   const itemInCart = state.items.find(item => item.id == action.payload.id);
      //   if (itemInCart) {
      //     itemInCart.quantity++;
      //   } else {
      //     state.items.push({...action.payload, quantity: 1});
      //   }

      // my slice
      // let basketList = state.items.slice();
      // let basket = basketList.filter(a => a.id == action.payload.id);
      // if (basket.length > 0) {
      //   let newQty = basket[0].qty + 1;
      //   basket[0].qty = newQty;
      //   basket[0].total = basket[0].qty * action.payload.price;
      // } else {
      //   state.items.push({
      //     ...action.payload,
      //     qty: 1,
      //     total: action.payload.price,
      //   });
      // }
    },
    removeFromBasket: (state, action) => {
      let newBasket = [...state.items];
      let itemIndex = state.items.findIndex(
        item => item.id == action.payload.id,
      );
      if (itemIndex >= 0) {
        newBasket.splice(itemIndex, 1);
      } else {
        console.log("can't remove item as its not in the basket");
      }
      state.items = newBasket;

      //   let newBasket = [...state.items];
      //   let basket = state.items.filter(item => item.id == action.payload.id);
      //   if (basket.length >= 0) {
      //     let newQty = basket[0].qty - 1;
      //     basket[0].qty = newQty;
      //     basket[0].total = basket[0].qty * action.payload.price;
      //   }
      //   state.items = newBasket;
    },
    emptyBasket: (state, action) => {
      state.items = [];
    },
  },
});

export const {addToBasket, removeFromBasket, emptyBasket} = basketSlice.actions;

export const selectBasketItems = state => state.basket.items;
export const selectBasketItemsById = (state, id) =>
  state.basket.items.filter(item => item.id == id);

export const selectBasketTotal = state =>
  state.basket.items.reduce((total, item) => (total = total += item.price), 0);

export default basketSlice.reducer;
