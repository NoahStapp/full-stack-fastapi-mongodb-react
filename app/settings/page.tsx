'use client'

import { KeyIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/24/outline"
import ValidateEmailButton from "../components/settings/ValidateEmailButton"
import Profile from "../components/settings/Profile"
import Security from "../components/settings/Security"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "../hooks"
import { RootState } from "../stores/store"
import { profile } from "../slices/authSlice"

const navigation = [
  { name: "Account", id: "ACCOUNT", icon: UserCircleIcon },
  { name: "Security", id: "SECURITY", icon: KeyIcon },
]
const title = "Settings"
const description = "Update your personal settings, or delete your account."

export default function Settings() {
  const [selected, changeSelection] = useState("ACCOUNT")
  const currentProfile = useAppSelector((state: RootState) => profile(state))  

  const router = useRouter()


  const renderNavigation = () => {
    return navigation.map(item =>
      <button 
        key={`settings-${item.id}`}
        className={[item.id === selected 
                  ? 'text-rose-700 hover:text-rose-700' 
                  : 'text-gray-900 hover:text-gray-900', 'group rounded-md px-3 py-2 flex items-center text-sm font-medium'].join(' ')}
        onClick={() => changeSelection(item.id)}
      >
        <item.icon
          className={[item.id === selected  
            ? 'text-rose-700 group-hover:text-rose-700' 
            : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6'].join(' ')} aria-hidden="true" 
        />
        <span className="truncate">{item.name}</span>
      </button>
      )
  }

  return (
      <main className="flex min-h-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="p-5">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1" aria-label="tabs">
              {renderNavigation()}
              {currentProfile.is_superuser &&
                <button 
                  className="text-gray-900 hover:text-gray-900 group rounded-md px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                  onClick={() => router.push('/moderation')}
                >
                  <UsersIcon className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" aria-hidden="true" />
                  <span className="truncate">Moderation</span>
                </button>
              }
              {!currentProfile.email_validated &&
                <ValidateEmailButton/>
              }
            </nav>
          </aside>
          <div className="space-y-6 ml-3 sm:px-6 lg:col-span-9 min-w-full lg:px-0">
            {selected === 'ACCOUNT' &&
                <Profile />
            }
            {selected === 'SECURITY' &&
                <Security />
            }
          </div>
        </div>
      </div>
    </main>
  )
}