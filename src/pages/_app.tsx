import React, { Fragment } from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import type { Page } from "@/types/page"
import { SWRConfig } from "swr"
import { SessionProvider } from "next-auth/react"
import theme from "../theme"
import { ThemeProvider } from "@mui/styles"
import RouteGuard from "@/components/RouteGuard"
import { Provider } from 'react-redux'
import store from '../store'

// this should give a better typing
type MyAppProps = AppProps & {
    Component: Page
}
const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }: MyAppProps) => {
    // adjust accordingly if you disabled a layout rendering option
    const GetLayout = Component.getLayout ?? React.Fragment
    const Layout = Component.layout ?? Fragment

    
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <SWRConfig
                        value={{
                            fetcher: fetch,
                            onError: (err) => {
                                console.error(err)
                            }
                        }}
                    >
                        {/* <RouteGuard> */}
                            <Layout>
                                <GetLayout>
                                    <Component {...pageProps} />
                                </GetLayout>
                            </Layout>
                        {/* </RouteGuard> */}
                    </SWRConfig>
                </ThemeProvider>
            </Provider>
        </SessionProvider>
    )
}

export default MyApp
