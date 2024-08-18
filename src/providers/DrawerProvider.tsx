import {
  type ContextType,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

const DrawerContext = createContext<
  | {
      open: boolean
      setOpen: Dispatch<SetStateAction<boolean>>
    }
  | undefined
>(undefined)

export const useDrawerContext = (): NonNullable<
  ContextType<typeof DrawerContext>
> => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw Error('useOpen must be used within DrawerProvider.')
  }

  return context
}

export const DrawerProvider: FC<
  PropsWithChildren<{ initialValue?: boolean }>
> = ({ children, initialValue = false }) => {
  const [open, setOpen] = useState<boolean>(initialValue)

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}
