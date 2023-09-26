

import { useAuthStore } from "@/stores"
import { Menu, Transition } from "@headlessui/react"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

// const authStore = useAuthStore
const navigation = [
  { name: "Settings", to: "/settings" },
]
const redirectRoute = "/"
async function logout() {
    // authStore.logOut()
    // await navigateTo(redirectRoute)
}

const renderNavLinks = (active: boolean) => {
    return navigation.map((nav) => (
        <Link
            href={nav.to}
            key={nav.name}
            className={[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700'].join(' ')}>
            {nav.name}
        </Link>
    ))
}


export default function AuthenticationNavigation() {
    return (
        <div>
            {/* <!-- Profile dropdown --> */}
            <Menu as="div" className="relative ml-3">
            <div v-if="!authStore.loggedIn">
                <Link 
                    href="/login"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                    <ArrowLeftOnRectangleIcon className="block h-6 w-6" />
                </Link>
            </div>
            <div v-else>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </Menu.Button>
            </div>
            <Transition 
            enter="transition ease-out duration-200" 
            enterFrom="transform opacity-0 scale-95" 
            enterTo="transform opacity-100 scale-100" 
            leave="transition ease-in duration-75" 
            leaveFrom="transform opacity-100 scale-100" 
            leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                {({ active }) => (
                    <>
                    {renderNavLinks(active)}
                    </>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <a
                        className={[active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer'].join(' ')}
                        onClick={logout}
                    >
                        Logout
                    </a>
                )}
                </Menu.Item>
                </Menu.Items>
            </Transition>
            </Menu>
        </div>
    )
}