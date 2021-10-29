import { createTheme, ThemeOptions, colors } from "@mui/material"

const theme = createTheme({
    palette: {
        background: {
            default: "#f6f6f6",
            paper: colors.common.white
        },
        primary: {
            main: colors.indigo[500]
        },
        secondary: {
            main: "#C4C4C4"
        },
        text: {
            primary: "#C4C4C4"
        },
        common: {
            brand: "#00B8E6"
        }
    }
} as ThemeOptions)

export default theme
