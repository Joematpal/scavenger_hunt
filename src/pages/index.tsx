
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Page } from '@/types/page'

import { ScavengerHuntView } from '@/modules/ScavengerHunt/ScavengerHuntView'
import getLayout from '@/modules/ScavengerHunt/getLayout'
const Home: Page = () => {
  const {data:session, status} = useSession()

  if (status === "loading") {
      return <div>{"loading"}</div>
  }

  return (
    <div className={styles.container}>
      
        {/* <PersistentDrawerLeft /> */}
        {/* <>
            {!session && <>
          Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </>}
            {session && <>
          Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>}
        </> */}

      <ScavengerHuntView/>

    </div>
  )
}

export default Home

Home.getLayout = getLayout


