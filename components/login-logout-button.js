"use client"

import { signIn, signOut, useSession } from "next-auth/react"

const LoginLogoutButtonComponent = () => {
    const session = useSession()
    console.log(session)
    const loginLogoutHandler = () => {
        if (session.status === "authenticated")
            signOut({ callbackUrl: '/' })
        else
            signIn()
    }
    return (
        <div onClick={loginLogoutHandler}>{session.status === "authenticated" ? "Logout" : "Login"}</div>
        // <div onClick={loginLogoutHandler}>{session.status === "authenticated" ? "Logout" : session.status === "unauthenticated" ? "Login" : "Login/Logout"}</div>

    )
}

export default LoginLogoutButtonComponent