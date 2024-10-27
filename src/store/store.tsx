import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducer from './steps-slice'
import createSagaMiddleware from 'redux-saga'
import { stepsSaga } from './steps-saga'

const rootReducer = combineReducers({
  reducer,
})

const saga = createSagaMiddleware()

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
})

saga.run(stepsSaga)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = AppStore['dispatch']
