import React from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'

import { Box, Grid, IconButton, Theme } from "@mui/material"
import { selectGameState } from "./scavengerHuntSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import {checkPhoto} from "./scavengerHuntSlice"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      height: "100%",
      textAlign: 'center',
    },
    imgBox: {
      maxWidth: "80%",
      maxHeight: "80%",
      margin: "10px"
    },
    img: {
      height: "inherit",
      maxWidth: "inherit",
    },
    input: {
      display: "none"
    }
  }))

const CameraView = () => {
    const classes = useStyles()
    const [source, setSource] = React.useState("")
    const dispatch = useAppDispatch()

    const gameState = useAppSelector(selectGameState)
    

    const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files) {
            if (event.target.files.length !== 0) {
                const file = event.target.files[0]

                const formData = new FormData()
                formData.append(
                    "file",
                    file
                )
                const url = URL.createObjectURL(file)

                setSource(url)

                dispatch(checkPhoto({gameId: gameState.gameId, formData: formData, level: gameState.level}))
            }
        }
    }


    return (<React.Fragment>
        <Grid container>
            <Grid item xs={12}>
                <h5>Capture your image</h5>
                {source &&
                    <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
                        <Image src={source} alt={"snap"} className={classes.img} layout={"fill"} unoptimized></Image>
                    </Box>}
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    capture="environment"
                    onChange={(e) => handleCapture(e)}
                />
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <PhotoCameraIcon fontSize="large" color="primary" />
                    </IconButton>
                </label>
            </Grid>
        </Grid>
    </React.Fragment>)
}

export default CameraView


