import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
	value: number
}

const initial_state: CounterState = {
	value: 0
}

export const counter_slice = createSlice({
	name: 'counter',
	initialState: initial_state,
	reducers: {
		increment: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1
		},
		decrement: state => {
			state.value -= 1
		},
		increment_by_amount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		}
	}
})

export default counter_slice
// Action creators are generated for each case reducer function
export const { increment, decrement, increment_by_amount: incrementByAmount } = counter_slice.actions
