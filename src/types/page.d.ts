import { NextPage } from "next"
import { ComponentType, ReactElement, ReactNode } from "react"

interface LayoutProps {
  children: ReactElement | ReactElement[]
}
export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: ( props: LayoutProps) => ReactElementType
  layout?: ComponentType
}


