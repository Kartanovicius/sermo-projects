import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from './features/weather/weather.api'
import projectReducer from './features/project/projectSlice'
import projectsReducer from './features/project/projectsSlice'

export const store = configureStore({
  reducer: { 
    project: projectReducer,
    projects: projectsReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(weatherApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch