import { configureStore } from '@reduxjs/toolkit'
import counter_slice from './count-slice'

const store = configureStore({
	reducer: {
		counter: counter_slice.reducer
	}
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
