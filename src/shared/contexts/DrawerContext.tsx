import { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerOptions {
  icon: string
  path: string
  label: string
}

interface IDrawerContextData {
    isDrawerOpen: boolean
    drawerOptions: IDrawerOptions[]
    toggleDrawerOpen: () => void
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void
}
const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

interface IDrawerProviderProps {children: React.ReactNode}
export const DrawerProvider: React.FC<IDrawerProviderProps>  = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
  }, [])

  const handleDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions)
  }, [])

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  )
}