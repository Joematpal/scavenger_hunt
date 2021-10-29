import { Box, Button } from "@mui/material"
import React, { Fragment } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectLevel,  selectGameState, start } from "./scavengerHuntSlice"

export const ScavengerHuntView: React.ComponentType = () => {
    const dispatch = useAppDispatch()
    const level = useAppSelector(selectLevel)
    const gameState = useAppSelector(selectGameState)
    console.log("gameState", gameState)


    if (level === 0 || !!level) {
        return <Fragment>
            <Box>Are you ready?</Box>
            <Button variant="contained" onClick={() => dispatch(start(gameState))}>Start</Button>
        </Fragment>
    }

    return <Fragment></Fragment>

}