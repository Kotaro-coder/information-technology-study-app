'use client'

import { ReactNode, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"

type Props = {
    children: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
    const authInfo = useAuth();
    const router = useRouter();

    //useEffectが一番最後に処理される
    useEffect(() => {
        if(authInfo.checked && !authInfo.isAuthenticated) {
            router.replace("/signin");
        }
    }, [authInfo.checked, authInfo.isAuthenticated, router]);

    if(!authInfo.checked) {
        return <div>Loading...</div>
    }

    if(authInfo.isAuthenticated) {
        return <>{children}</>
    }
    return null;
}

export const GuestRoute = ({ children }: Props) => {
    const authInfo = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(authInfo.checked && authInfo.isAuthenticated) {
            router.replace("/");
        }
    }, [authInfo.checked, authInfo.isAuthenticated, router])

    if(!authInfo.checked) {
        return <div>Loading...</div>
    }

    if(authInfo.isAuthenticated) {
        return null;
    }

    return <>{children}</>
}