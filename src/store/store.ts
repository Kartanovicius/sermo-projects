import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from './features/weather/weather.api'
import { projectApi } from './features/project/project.api'

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware).concat(projectApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
