import React, { createContext, useContext } from 'react'


type BusAction = string
type BusHandler<T = any> = (payload: T) => void
type BusPayload = Record<string, any>

export interface Bus {
  on (name: BusAction, handler: BusHandler): void,
  off (name: BusAction, handler: BusHandler): void,
  once (name: BusAction, handler: BusHandler): void,
  emit (name: BusAction, payload?: BusPayload): void
}

export function bus (): Bus {
  const book: Record<BusAction, BusHandler[]> = {}

  const on: Bus['on'] = (name, handler) => {
    if (!book[name]) {
      book[name] = []
    }
    book[name].push(handler)
  }
  
  const off: Bus['off'] = (name, handler) => {
    const index = book[name].indexOf(handler) ?? -1
    book[name].splice(index >>> 0, 1)
  }

  const once: Bus['once'] = (name, handler) => {
    const handleOnce = (payload: Parameters<typeof handler>) => {
      handler(payload)
      off(name, handleOnce)
    }
    on(name, handleOnce)
  }

  const emit: Bus['emit'] = (name, payload) => {
    book[name]?.forEach(fn => {
      try {
        fn(payload)
      } catch (e) {
        console.log(e)
      }
    })
  }

  return {
    on,
    off,
    once,
    emit
  }
}

const instance = bus()
const BusContext = createContext<Bus | null>(null)

export const BusProvider: React.FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  return (
    <BusContext.Provider value={instance}>
      {children}
    </BusContext.Provider>
  )
}

export const useBus = () => {
  const bus = useContext(BusContext) || instance
  return bus
}

type BusExtraProps = {
  bus: Bus
}

export function WithBus<P extends BusExtraProps> (Component: React.FC<P>): React.FC<P> {
  const bus = useContext(BusContext)
  const fc: React.FC<P> = (props: P) => (
    <Component {...props} bus={bus} />
  )
  fc.displayName = 'WithBus'
  return fc
} 