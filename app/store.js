import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import chatSlice from '../features/chatSlice'

export default configureStore({
  reducer: {
    chat: chatReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})