import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserProfile } from '../interfaces';
import { getTokens } from './tokensSlice';
import { RootState } from '../stores/store';
import { tokenIsTOTP, tokenParser } from "@/utilities"
import { addNotice } from './toastsSlice';

interface AuthState {
  id: string,
  email: string,
  email_validated: boolean,
  is_active: boolean,
  is_superuser: boolean,
  full_name: string,
  password: boolean,
  totp: boolean,
}

const initialState: AuthState = {
  id: "",
  email: "",
  email_validated: false,
  is_active: false,
  is_superuser: false,
  full_name: "",
  password: false,
  totp: false
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserProfile: (state: AuthState, action: PayloadAction<IUserProfile>) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.email_validated = action.payload.email_validated
      state.is_active = action.payload.is_active
      state.is_superuser = action.payload.is_superuser
      state.full_name = action.payload.full_name
      state.password = action.payload.password
      state.totp = action.payload.totp
    },
  },
})

export const { setUserProfile } = authSlice.actions

export const logIn = (token: string) => 
    async (dispatch: Dispatch, getState: () => RootState) => {
      try {
        const access_token = getState().tokens.access_token
        if (token && !tokenIsTOTP(token) && access_token) {
          try {
            const { data: response } = await apiAuth.getProfile(access_token)
            if (response.value) dispatch(setUserProfile(response.value))
          } catch (error) {
            dispatch(logOut())
          }
        }
      } catch (error) {
        dispatch(addNotice({
          title: "Login error",
          content: "Please check your details, or internet connection, and try again.",
          icon: "error"
        }))
        dispatch(logOut())
      }
    }
 

export default authSlice.reducer
