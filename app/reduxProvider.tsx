'use client'

import { store } from './stores/store'
import { Provider } from "react-redux";

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}