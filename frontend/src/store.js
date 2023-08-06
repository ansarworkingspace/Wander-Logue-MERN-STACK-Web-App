import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import { apiSlice } from './slices/ApiSlice';
import adminReducer from './adminSlice/AdminAuthSlice'
// import checkTokenMiddleware from './middleware/checkTokenMIddleware'


const rootReducer = combineReducers({
  auth:authReducer,
  adminAuth:adminReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});



const store = configureStore({
    reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

export default store;