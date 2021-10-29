
import LayoutView from '@/components/LayoutView'
import DrawerView from '@/components/DrawerView'
import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectLevel, } from "./scavengerHuntSlice"
import type {DrawerMenu} from '@/components/DrawerView'

import DashboardIcon from '@mui/icons-material/Dashboard';

const GetLayout = ({ children }: any) => {

  // const dispatch = useAppDispatch()
  let buttons: DrawerMenu[] = []
  const level = useAppSelector(selectLevel)
  switch (level) {
    case 0:
      buttons = []
      break
    case 1:
      buttons = [{ name: "level 1", icon:DashboardIcon, route:"" }]
      break
  }

  return (
    <LayoutView>
      <DrawerView
        title="Scavenger Hunt"
        huntName="Karen's Hunt"
        buttons={buttons}
      // make it so that the menu is dynamic
      />
      {children}
    </LayoutView>
  )
}

export default GetLayout