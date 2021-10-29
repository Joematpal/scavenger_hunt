import React from "react"
import Head from "next/head"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

import { Container, IconButton, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from "@mui/system"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex"
    }
}))


export default function Layout({ children }: any) {
    const classes = useStyles()
    return (
        <>
            <Head>
                <title>{`Karen's Scavenger Hunt`}</title>
            </Head>
            <main className={classes.root} style={{ display: "flex" }}>
                <Container>
                    {children}
                </Container>
            </main>
        </>
    )
}
