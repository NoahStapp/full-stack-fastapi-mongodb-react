import { ITokenResponse, IWebToken } from "@/interfaces"
import { apiAuth } from "@/api"
import { tokenExpired, tokenParser } from "@/utilities"
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addNotice } from "./toastsSlice";

interface TokensState {
    access_token: string,
    refresh_token: string,
    token_type: string
  }
  
const initialState: TokensState = {
    access_token: "",
    refresh_token: "",
    token_type: ""
  };

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setMagicToken: (state: TokensState, action: PayloadAction<IWebToken>) {
            state.access_token = action.payload.claim
          },
        setTokens (state: TokensState, action: PayloadAction<ITokenResponse>) {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            state.token_type = action.payload.token_type
          },
        deleteTokens: (state: TokensState) => {
            initialState
        }
    },
})

export const { setMagicToken, setTokens, deleteTokens } = tokensSlice.actions

export const getTokens = (payload: { username: string; password?: string }) => {
    return async (dispatch: Dispatch) => {
        let response
        try {
            if (payload.password !== undefined) (
                { data: response } = await apiAuth.loginWithOauth(
                    payload.username,
                    payload.password
                )
            )
            else (
                { data: response } = await apiAuth.loginWithMagicLink(
                    payload.username
                )
            )
            if (response.value) {
                if (response.value.hasOwnProperty("claim")) dispatch(setMagicToken(response.value as unknown as IWebToken))
                else dispatch(setTokens(response.value as unknown as ITokenResponse))
            } else throw "Error"
        } catch (error) {
            dispatch(addNotice({
                title: "Login error",
                content: "Ensure you're using the same browser and that the token hasn't expired.",
                icon: "error"
            }))
            dispatch(deleteTokens())
        }
    }
}

export const validateMagicTokens = (token: string) => 
    async (dispatch: Dispatch) => {
        try {
            const data: string = token
            // Check the two magic tokens meet basic criteria
            const localClaim = tokenParser(data)
            const magicClaim = tokenParser(token)
            if (localClaim.hasOwnProperty("fingerprint") 
                && magicClaim.hasOwnProperty("fingerprint")
                && localClaim["fingerprint"] === magicClaim["fingerprint"]) {
              const { data: response } = await apiAuth.validateMagicLink(
                token, { "claim": data }
              )
                if (response.value) {
                    dispatch(setTokens(response.value as unknown as ITokenResponse))
                } else throw "Error"
            }
        } catch (error) {
            dispatch(addNotice({
                title: "Login error",
                content: "Ensure you're using the same browser and that the token hasn't expired.",
                icon: "error"
            }))
            dispatch(deleteTokens())
        }
    }

export const validateTOTPClaim = (data: string) => 
    async (dispatch: Dispatch, getState: () => TokensState) => {
        try {
            const access_token = getState().access_token
            const { data: response } = await apiAuth.loginWithTOTP(access_token, { "claim": data })
            if (response.value) {
              dispatch(setTokens(response.value as unknown as ITokenResponse))
            } else throw "Error"
          } catch (error) {
            dispatch(addNotice({
              title: "Two-factor error",
              content: "Unable to validate your verification code. Make sure it is the latest.",
              icon: "error"
            }))
            dispatch(deleteTokens())
          }
    }

export const refreshTokens = () => 
    async (dispatch: Dispatch, getState: () => TokensState) => {
        const currentState = getState()
        let hasExpired = currentState.access_token ? tokenExpired(currentState.access_token) : true
        if (hasExpired) {
          hasExpired = currentState.refresh_token ? tokenExpired(currentState.refresh_token) : true
          if (!hasExpired) {
            try {
              const { data: response } = await apiAuth.getRefreshedToken(currentState.refresh_token)
              if (response.value) dispatch(setTokens(response.value))
            } catch (error) {
              dispatch(deleteTokens())
            } 
          } else {
            dispatch(deleteTokens())
          }    
        }
      }


export const token = (state: TokensState) => state.access_token
export const refresh = (state: TokensState) => state.refresh_token

export default tokensSlice.reducer
