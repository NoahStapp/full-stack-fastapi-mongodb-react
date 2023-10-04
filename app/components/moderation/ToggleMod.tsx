
import { apiAuth } from "../../api"
import { IUserProfileUpdate } from "../../interfaces"
import CheckToggle from "./CheckToggle"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../stores/store"
import { useState } from "react"
import { refreshTokens, token } from "../../slices/tokensSlice"
import { addNotice } from "../../slices/toastsSlice"

interface ToggleModProps {
    email: string
    check: boolean
}

export default function ToggleMod(props: ToggleModProps) {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state: RootState) => token(state))
  
    const [enabled, setEnabled] = useState(props.check)

    async function submit() {
        await dispatch(refreshTokens())
        const data: IUserProfileUpdate = {
            email: props.email,
            is_superuser: !props.check
        }
        const res = await apiAuth.toggleUserState(accessToken, data)
        if (!res || !res.msg) {
            dispatch(addNotice({
                title: "Update error",
                content: res ? res.msg : "Invalid request.",
                icon: "error"
            }))
            setEnabled(props.check)
        }
    }

    return (
        <CheckToggle check={enabled} onClick={submit} />
    )
}
