"use client"

import { persistor, store } from "./store"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return (
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      {props.children}
    {/* </PersistGate> */}
  </Provider>
  )
}
