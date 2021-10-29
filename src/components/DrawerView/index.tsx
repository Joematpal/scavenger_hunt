import React from 'react'
import { styled, useTheme } from '@mui/system'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

import { SvgIconTypeMap, Theme } from '@mui/material'
import { ClassNameMap, makeStyles } from '@mui/styles'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Link from "next/link"
import MuiLink from '@mui/material/Link'
const drawerWidth = 240


interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => {
  let t = theme as Theme
  return {
    transition: t?.transitions?.create(['margin', 'width'], {
      easing: t?.transitions?.easing.sharp,
      duration: t?.transitions?.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: t?.transitions?.create(['margin', 'width'], {
        easing: t?.transitions?.easing.easeOut,
        duration: t?.transitions?.duration.enteringScreen,
      }),
    }),
  }
})

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

export type DrawerSubMenu = DrawerMenu[]

export type DrawerMenu = {
  name: string,
  route?: string,
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  onClick?: () => void,
  subMenu?: DrawerSubMenu,
}

interface DrawerViewProps {
  huntName: string
  title: string
  buttons: DrawerMenu[]
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))


const DrawerView = ({ huntName = "", title = "", buttons = [] }: DrawerViewProps) => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box component="div" sx={{ display: "flex", alignItems: 'center', justifyContent: "center" }}><h1>{huntName}</h1></Box>
        <Divider />
        <List>
          {buttons.map((ele, index) => {
            return !ele.onClick ? <Link
              key={ele.name || "" + "_" + index}
              href={ele.route || "/"}
              passHref
            >
              <ListItem button>
                <ListItemIcon>
                  <ele.icon />
                </ListItemIcon>
                <ListItemText primary={ele.name} />
              </ListItem>
            </Link>
              : <MuiLink onClick={() => ele?.onClick && ele.onClick()}>
                {GetListItem(ele, {})}
              </MuiLink>
          })}
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default DrawerView

const GetListItem = (ele: DrawerMenu, classes: ClassNameMap) => {
  return (<ListItem
    button
  >
    {ele.icon
      ? <ListItemIcon>
        <ele.icon className={classes.icon} />
      </ListItemIcon>
      : null}
    <ListItemText>{ele.name}</ListItemText>
  </ListItem>)
}