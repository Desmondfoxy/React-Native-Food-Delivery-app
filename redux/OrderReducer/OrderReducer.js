import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
  },
  reducers: {
    increaseOrder: (state, action) => {
      state.order.push(action.payload);
      //   const itemInOrder = state.order.find(
      //     item => item.menuId == action.payload.menuId,
      //   );
      //   console.log(action.payload);
      //   //   console.log(itemInOrder);
      //   if (itemInOrder) {
      //     itemInOrder.qty++;
      //   } else {
      //     const newQty = {
      //       ...action.payload,
      //       qty: 1,
      //     };
      //     // console.log(newQty);
      //     state.order.push(newQty);
      //   }
      //   const newOrder = {...action.payload, qty: 1};
    },
    decreaseOrder: (state, action) => {},
  },
});

export const {increaseOrder} = orderSlice.actions;
export default orderSlice.reducer;
