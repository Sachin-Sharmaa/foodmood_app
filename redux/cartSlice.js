import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice ({
	name: 'cart',
	initialState: {
		dishes: [],
		quantity: 0,
		total: 0
	},
	reducers: {
		addDish: (state,action) => {
			state.dishes.push(action.payload)
			state.quantity += 1;
			state.total += action.payload.price * action.payload.quantity;
		},
		reset: (state) => {
	      state.dishes = [];
	      state.quantity = 0;
	      state.total = 0;
	    }
	}
});

export const {addDish, reset} = cartSlice.actions;
export default cartSlice.reducer;


