import { apiAuth } from "../../lib/api"
import { IUserProfileUpdate } from "../../lib/interfaces"
import CheckToggle from "./CheckToggle"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { refreshTokens, token } from "../../lib/slices/tokensSlice"
import { addNotice } from "../../lib/slices/toastsSlice"
import { RootState } from "../../lib/store"

interface ToggleActiveProps {
  email: string
  check: boolean
}

export default function ToggleActive(props: ToggleActiveProps) {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state: RootState) => token(state))

  const [enabled, setEnabled] = useState(props.check)

  async function submit() {
    await dispatch(refreshTokens())
    const data: IUserProfileUpdate = {
      email: props.email,
      is_active: !props.check,
    }
    const res = await apiAuth.toggleUserState(accessToken, data)
    if (!res || !res.msg) {
      dispatch(
        addNotice({
          title: "Update error",
          content: res ? res.msg : "Invalid request.",
          icon: "error",
        }),
      )
      setEnabled(props.check)
    }
  }

  return <CheckToggle check={props.check} onClick={submit} />
}
