import React, { useState, useEffect, Fragment, ReactNode, ElementType } from 'react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"



interface RouteGuardProps {
    children: ReactNode
}

const RouteGuard: ElementType = ({ children }: RouteGuardProps) => {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    const { data: session, status } = useSession()
    const isLoading = status === "loading"


    useEffect(() => {

        // on initial load - run auth check 
        authCheck(router.asPath)

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false)
        router.events.on('routeChangeStart', hideContent)

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent)
            router.events.off('routeChangeComplete', authCheck)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    function authCheck(url: string) {

        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/api/auth/signin']
        const path = url.split('?')[0]

        if (!isLoading && !session && !publicPaths.includes(path)) {
            setAuthorized(false)
            router.push({
                pathname: '/api/auth/signin',
                // TODO: add the host to this....
                query: { callbackUrl: router.asPath }
            })
        } else {
            setAuthorized(true)
        }
    }

    return <Fragment>
        {authorized && children}
    </Fragment>
}

export default RouteGuard
